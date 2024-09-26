import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PostReactions } from '@prisma/client';

@Injectable()
export class ReactionsService {

  constructor(private readonly prismaService: PrismaService) {}



  async createReaction(data: CreateReactionDto) {

    try{
 
      const results: PostReactions = await this.prismaService.postReactions.create(
        {
          data: {
            userId: data.userId,
            postId: data.postId,
            reaction: data.reaction,
          }
        })

        return results;

    }catch(error){
      console.log(error)



    }


  }

  findAllReactions() {
    return `This action returns all reactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reaction`;
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    return `This action updates a #${id} reaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} reaction`;
  }

  

}
