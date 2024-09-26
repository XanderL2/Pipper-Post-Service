import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    @IsInt({ message: 'Is a int number' })
    userId: number;

    @IsNotEmpty()
    @IsString()
    content: string;
}
