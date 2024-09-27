import { Module } from '@nestjs/common';
import { CommentariesReactionsService } from './commentaries-reactions.service';
import { CommentariesReactionsController } from './commentaries-reactions.controller';

@Module({
  controllers: [CommentariesReactionsController],
  providers: [CommentariesReactionsService],
})
export class CommentariesReactionsModule {}
