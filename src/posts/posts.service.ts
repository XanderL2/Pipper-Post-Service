import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {

  private prismaService: PrismaService

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async create(data: CreatePostDto) {

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
        throw new Error('Duplicate entry for a unique field.');
      }

      throw new Error('Failed to create post.');
    }
  }


  findHomePosts(page: number, limit: number) {
    return `This action returns all posts`;
  }

  findOnePost(postId: number, page: number, limit: number) {
    return `This action returns a post`;
  }

  findUserPosts(id: number) {
    return id
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  removePost(id: number) {
    return `This action removes a #${id} post`;
  }

}
