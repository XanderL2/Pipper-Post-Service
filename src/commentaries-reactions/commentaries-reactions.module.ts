import { Module } from '@nestjs/common';
import { CommentariesReactionsService } from './commentaries-reactions.service';
import { CommentariesReactionsController } from './commentaries-reactions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationUtilsService } from 'src/posts/imports';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';

@Module({
  controllers: [CommentariesReactionsController],
  providers: [CommentariesReactionsService, PrismaService, ValidationUtilsService, ErrorUUtilsService],
})
export class CommentariesReactionsModule {}
