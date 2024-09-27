import { Injectable } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';


@Injectable()
export class CommentariesService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorUtilsService: ErrorUUtilsService
  ) {
    this.prismaService = prismaService;
    this.errorUtilsService = errorUtilsService;
  }


  async createCommentary(body: CreateCommentaryDto) {

    try {

      const response = await this.prismaService.commentary.create({
        data: {
          ...body
        }
      });

      return response;
     
    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Comentary');      
    }

  }

  async findByPostId(postId: string, page: number, limit: number) {

    try {

      const offset: number = (page - 1) * limit;
      
      const results = await this.prismaService.commentary.findMany({
        where: {postId: postId},
        skip: offset,
        take: limit
      });      
      

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Comentary');      
    }
  }

  async updateCommentaryById(commentaryId: string, body: UpdateCommentaryDto) {

    try {

      const response = await this.prismaService.commentary.update({
        where: {id: commentaryId},
        data: {
          ...body
        }
      });

      return response;

    }catch(error){
      throw this.errorUtilsService.handleDBPrismError(error, 'Comentary');      
    }

  }

  async removeCommentaryById(commentaryId: string) {

    try {
      
      const results = await this.prismaService.commentary.delete({
        where: {id: commentaryId}
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Comentary');      
    }
  }

}
