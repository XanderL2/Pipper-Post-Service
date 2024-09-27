import { PartialType } from '@nestjs/swagger';
import { CreateCommentaryDto } from './create-commentary.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    commentaryId: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
