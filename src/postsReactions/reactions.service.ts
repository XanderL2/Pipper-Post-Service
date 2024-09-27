import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PostReactions } from '@prisma/client';
import { ErrorUUtilsService } from '../shared/utils/handleErrors.service';
import { UpdateReactionDto } from './dto/update-reaction.dto';


@Injectable()
export class ReactionsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorUtilsService: ErrorUUtilsService
  ) { }


  async createReaction(data: CreateReactionDto) {

    try {

      const results: PostReactions = await this.prismaService.postReactions.create(
        {
          data: {
            userId: data.userId,
            postId: data.postId,
            reaction: data.reaction,
          }
        });

      return results;

    } catch (error) {
      throw await this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }
  }


  async fetchReactionsByPost(postId: string, page: number, limit: number) {

    try {

      const offset: number = (page - 1) * limit;

      const results = await this.prismaService.postReactions.findMany({
        where: { postId: postId },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }
  }

  async updateReactionById(reactionId: string, data: UpdateReactionDto) {

    try {

      const updatedReactionResults = await this.prismaService.postReactions.update({
        where: {
          id: reactionId
        },
        data: {
          reaction: data.reaction,
        },
      });

      return updatedReactionResults;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }
  }


  async removeReactionById(reactionId: string) {
    try {
      const results = await this.prismaService.postReactions.delete({
        where: {
          id: reactionId,
        }
      });

      return results;

    } catch (error) {
      throw this.errorUtilsService.handleDBPrismError(error, 'Reaction');
    }
  }


}
