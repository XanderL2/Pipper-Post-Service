import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class isValidId implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {

    if (typeof value !== 'string' || !/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new HttpException('Id not valid for MongoDB Database', HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
