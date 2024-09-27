import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {


    @ApiProperty({
        description: 'The user ID that creates the post',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsInt({ message: 'Is a int number' })
    userId: number;


    @ApiProperty({
        description: 'Post content',
        example: 'Hello, this is a post!',
        required: true,
        type: String
    })
    @IsNotEmpty()
    @IsString()
    content: string;
}
