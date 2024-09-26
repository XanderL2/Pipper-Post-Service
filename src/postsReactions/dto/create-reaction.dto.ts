import { ReactionsEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReactionDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsNotEmpty()
    @IsEnum(ReactionsEnum)
    reaction: ReactionsEnum;

}
