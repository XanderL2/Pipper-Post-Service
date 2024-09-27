import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationUtilsService } from 'src/shared/utils/validations.service';
import { ErrorUUtilsService } from 'src/shared/utils/handleErrors.service';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService, ValidationUtilsService, ErrorUUtilsService],
})
export class ReactionsModule {}
