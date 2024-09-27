import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post} from '@prisma/client';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class PostsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorUtilsService: ErrorUUtilsService
  ) {
    this.prismaService = prismaService;
  }

  async createPost(data: CreatePostDto) {

    try {

      const results = await this.prismaService.post.create({
        data: {
          userId: data.userId,
          content: data.content
        }
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }

  }


  async findHomePosts(page: number, limit: number) {

    try {

      const offset: number = (page - 1) * limit;

      const posts = await this.prismaService.post.findMany({
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      });

      if (posts.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND);

      const groupedReactions = await this.getGropedReactionsByPost(posts);
      return this.mapPostsWithReactionCounts(groupedReactions, posts);


    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }


  }

  async findPostsByUserId(userId: number, page: number, limit: number) {

    try {
      const offset: number = (page - 1) * limit;

      const results = await this.prismaService.post.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      });

      if (results.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND);

      const groupedReactions = await this.getGropedReactionsByPost(results);
      return this.mapPostsWithReactionCounts(groupedReactions, results);


    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }

  }


  async findOnePost(postId: string) {

    try {
      const results = await this.prismaService.post.findUnique({
        where: { id: postId },
      });

      if (!results) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }

  }


  async updatePost(postid: string, data: UpdatePostDto) {

    try {

      const results = this.prismaService.post.update({
        where: { id: postid },
        data: { content: data.content }
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }

  }


  async deletePost(postsId: string) {

    try {

      const results = await this.prismaService.post.delete({
        where: { id: postsId }
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }
  }


  //!PRIVATE METHODS
  private async getPostsWithReactions(offset: number, limit: number) {
    const posts = await this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit
    });

    if (posts.length <= 0) return [];

    const groupedReactions = await this.getGropedReactionsByPost(posts);
    return this.mapPostsWithReactionCounts(groupedReactions, posts);

  }


  private async getGropedReactionsByPost(posts: Post[]) {
    const reactionsGroupedByPost = await this.prismaService.postReactions.groupBy({
      by: ['postId', 'reaction'],
      _count: {
        reaction: true,
      },
      where: {
        postId: {
          in: posts.map(post => post.id),
        },
      },
    });

    return reactionsGroupedByPost;
  }


  private mapPostsWithReactionCounts(groupedReactions, posts: Post[]) {

    const countReactionByType = (reactionType: string) => {
      const foundReaction = groupedReactions.find((reaction) => reaction.reaction === reactionType);

      return foundReaction ? foundReaction._count.reaction : 0;
    };

    return posts.map((post: Post) => {
      if (!groupedReactions.some(reaction => reaction.postId === post.id)) {
        return { ...post, reactions: null };
      }

      return {
        ...post,
        reactions: {
          LIKE: countReactionByType('LIKE'),
          LOVE: countReactionByType('LOVE'),
          WOW: countReactionByType('WOW'),
          SAD: countReactionByType('SAD'),
          ANGRY: countReactionByType('ANGRY'),
          BASED: countReactionByType('BASED'),
        },
      };
    });
  }

}