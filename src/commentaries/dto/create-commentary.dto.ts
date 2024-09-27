import { IsInt, IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class CreateCommentaryDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    postId: string;

}
