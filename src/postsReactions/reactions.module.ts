import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationsService } from 'src/shared/constants/utils/validations.service';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService, ValidationsService],
})
export class ReactionsModule {}
