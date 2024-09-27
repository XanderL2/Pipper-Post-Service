import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {

  @ApiProperty({
    description: 'Post content',
    example: 'Hello, this is a post!',
    required: true,
    type: String
  })
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;
}

