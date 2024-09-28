import { IsEnum, IsInt, IsMongoId, IsNotEmpty } from "class-validator";
import { Reactions } from "src/common/enums/reactions.enum";


export class CreateCommentariesReactionDto {

    @IsMongoId()
    @IsNotEmpty()
    commentaryId: string;


    @IsEnum(Reactions)
    @IsNotEmpty()
    reaction: Reactions;

    @IsInt()
    @IsNotEmpty()
    userId: number;

}
