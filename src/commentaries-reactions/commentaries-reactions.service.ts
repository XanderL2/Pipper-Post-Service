import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentariesReactionDto } from './dto/create-commentaries-reaction.dto';
import { UpdateCommentariesReactionDto } from './dto/update-commentaries-reaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';
import { ValidationUtilsService } from 'src/posts/imports';

@Injectable()
export class CommentariesReactionsService {

  constructor(
    private readonly db: PrismaService, 
    private readonly errorUtils: ErrorUUtilsService,
    private readonly validationService: ValidationUtilsService
  ){}


  async createReactionInCommentary(data: CreateCommentariesReactionDto) {

    try {

      const existingCommentary = await this.validationService.isAnExistingCommentaryId(data.commentaryId);
      if(!existingCommentary) throw new HttpException('Commentary not found', HttpStatus.NOT_FOUND);

      const results = await this.db.commentaryReactions.create({
        data: {
          ...data
        }
      });

      return results;

    } catch (error) {
      throw this.errorUtils.handleDBPrismError(error, 'Commentary Reactions');
    }

  }






  // findAll() {
  //   return `This action returns all commentariesReactions`;
  // }

  // update(id: number, updateCommentariesReactionDto: UpdateCommentariesReactionDto) {
  //   return `This action updates a #${id} commentariesReaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} commentariesReaction`;
  // }
  
}


