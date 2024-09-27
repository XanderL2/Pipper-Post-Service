import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReactionsEnum } from "@prisma/client";

export class CreateReactionDto {

    @ApiProperty({
        description: 'User ID',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;


    @ApiProperty({
        description: 'MnngoDb Post Id',
        example: '507f1f77bcf86cd799439011',
        required: true,
        type: String
    })
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    postId: string;

    @ApiProperty({
        description: 'Enum of Reactions: LIKE, LOVE, WOW, SAD, ANGRY, BASED',
        example: ReactionsEnum.LOVE,
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(ReactionsEnum)
    reaction: ReactionsEnum;

}
