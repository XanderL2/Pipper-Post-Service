import { Injectable } from '@nestjs/common';
import { CreateCommentariesReactionDto } from './dto/create-commentaries-reaction.dto';
import { UpdateCommentariesReactionDto } from './dto/update-commentaries-reaction.dto';

@Injectable()
export class CommentariesReactionsService {
  create(createCommentariesReactionDto: CreateCommentariesReactionDto) {
    return 'This action adds a new commentariesReaction';
  }

  findAll() {
    return `This action returns all commentariesReactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentariesReaction`;
  }

  update(id: number, updateCommentariesReactionDto: UpdateCommentariesReactionDto) {
    return `This action updates a #${id} commentariesReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentariesReaction`;
  }
}
