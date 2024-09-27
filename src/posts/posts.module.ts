import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationUtilsService } from 'src/shared/utils/validations.service';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, ValidationUtilsService, ErrorUUtilsService],
})

export class PostsModule { }