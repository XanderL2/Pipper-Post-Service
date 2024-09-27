import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class CreateCommentaryDto {
   
    @ApiProperty({
        description: 'The user ID',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsInt({ message: 'Is a int number' })
    userId: number;
 
    @ApiProperty({
        description: 'Commentary Content',
        example: 'This is a commentary',
        required: true,
        type: String 
    })
    @IsNotEmpty()
    @IsString()
    content: string;
 
    @ApiProperty({
        description: 'Post Id',
        example: '507f1f77bcf86cd799439011',
        required: true,
        type: String 
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    postId: string;

}
