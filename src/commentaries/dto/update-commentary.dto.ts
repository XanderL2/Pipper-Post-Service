import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentaryDto } from './create-commentary.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {
 
    @ApiProperty({
        description: 'Commentary Id',
        example: '507f1f77bcf86cd799439011',
        required: true,
        type: String 
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    commentaryId: string;
 
    @ApiProperty({
        description: 'Commentary Content',
        example: 'This is a commentary',
        required: true,
        type: String 
    })
    @IsString()
    @IsNotEmpty()
    content: string;
}
