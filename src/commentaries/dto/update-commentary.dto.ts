import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentaryDto {

    @ApiProperty({
        description: 'User Id',
        example: '1',
        required: true,
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;
 

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
