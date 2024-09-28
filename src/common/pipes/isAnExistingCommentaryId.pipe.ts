import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationUtilsService } from 'src/posts/imports';

@Injectable()
export class isAnExistingPostIdPipe implements PipeTransform {

    constructor(private readonly validationService: ValidationUtilsService){}

  async transform(value: string, metadata: ArgumentMetadata) {

    const existingPost = await this.validationService.isAnExistingCommentaryId(value);

    if(!existingPost) throw new HttpException('Commmentary not found', HttpStatus.NOT_FOUND);

    return value;

  }
}

