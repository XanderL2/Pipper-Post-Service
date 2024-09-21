import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

    const results = await this.prismaService.post.findMany({
      orderBy: { cratetedAt: 'desc' },
      skip: offset,
      take: limit
    });


    if (results.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND)

    return results

  }


  //* FindPostsByUserId :id
  async findPostsByUserId(userId: number, page: number, limit: number) {

    const offset: number = (page - 1) * limit;

    const results = await this.prismaService.post.findMany({
      where: { userId: userId},
      orderBy: { cratetedAt: 'desc' },
      skip: offset,
      take: limit
    });


    if (results.length <= 0) throw new HttpException('Results not found', HttpStatus.NOT_FOUND)

    return results

  }


  //* Find One Post
  async findOnePost(postId: string) {

    const results = await this.prismaService.post.findUnique({
      where: { id: postId }
    });

    if (!results) throw new HttpException('Post not found', HttpStatus.NOT_FOUND)

    return results
  }


  //* Update Posts
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
