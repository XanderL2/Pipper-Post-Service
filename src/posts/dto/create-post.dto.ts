import { IsInt, IsString} from "class-validator";

export class CreatePostDto {

    @IsInt({ message: 'Is a int number' })
    userId: number;

    @IsString()
    content: string;

}
