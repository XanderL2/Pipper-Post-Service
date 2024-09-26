import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationsService } from 'src/shared/constants/utils/validations.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, ValidationsService],
})

export class PostsModule { }