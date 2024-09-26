import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma, PostReactions } from '@prisma/client';
import { Reactions } from 'src/common/enums/reactions.enum';

@Injectable()
export class PostsService {

  private prismaService: PrismaService

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async createPost(data: CreatePostDto) {

    try {

      const results = await this.prismaService.post.create({
        data: {
          userId: data.userId,
          content: data.content
        }
      })

      return results;

    } catch (error) {
      console.error("Error creating post:", error);

      if (error.code === 'P2002') {
        throw new Error('Duplicate entry for a uniqueHome posts field.');
      }

      throw new Error('Failed to create post.');
    }
  }


  async findHomePosts(page: number, limit: number) {
    const offset: number = (page - 1) * limit;

    const posts = await this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit
    });

    if (posts.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND)

    const groupedReactions = await this.getGropedReactionsByPost(posts);
    return  this.mapPostsWithReactionCounts(groupedReactions, posts)
  }

  async findPostsByUserId(userId: number, page: number, limit: number) {

    const offset: number = (page - 1) * limit;

    const results = await this.prismaService.post.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit
    });

    if (results.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND)

    const groupedReactions = await this.getGropedReactionsByPost(results);
    return  this.mapPostsWithReactionCounts(groupedReactions, results)
  }


  async findOnePost(postId: string) {

    const results = await this.prismaService.post.findUnique({
      where: { id: postId }
    });

    if (!results) throw new HttpException('Post not found', HttpStatus.NOT_FOUND)

    return results
  }


  async updatePost(postid: string, data: UpdatePostDto) {

    try {

      const results = this.prismaService.post.update({
        where: { id: postid },
        data: { content: data.content }
      })

      return results;
    } catch (error) {
      this.handleDbError(error)

    }

  }


  async deletePost(postsId: string) {

    try {

      const results = await this.prismaService.post.delete({
        where: { id: postsId }
      });


      return results;

    } catch (error) {
      this.handleDbError(error)
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
    return this.mapPostsWithReactionCounts(groupedReactions, posts)

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


  private handleDbError(error: Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }

    if (error.code === 'P2002') {
      throw new HttpException('Input Duplicate', HttpStatus.BAD_REQUEST);
    }

    console.error(`Error has ocurred: ${error.message}`);

    throw new HttpException('An error has occurred during editing', HttpStatus.INTERNAL_SERVER_ERROR);
  }

}