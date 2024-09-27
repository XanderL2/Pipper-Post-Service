import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationUtilsService } from 'src/posts/imports';

@Module({
  controllers: [CommentariesController],
  providers: [CommentariesService, ErrorUUtilsService, PrismaService, ValidationUtilsService],
})
export class CommentariesModule {}
