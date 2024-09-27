import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class isAnExistingPostIdPipe implements PipeTransform {

    constructor(private readonly prismaService: PrismaService){}

  async transform(value: string, metadata: ArgumentMetadata) {

    const existingPost = await this.prismaService.post.findUnique({
        where: {id: value}
    });


    if(!existingPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return value;
  }
}

