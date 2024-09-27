import { PartialType } from '@nestjs/mapped-types';
import { CreateReactionDto } from './create-reaction.dto';
import { IsEnum, IsInt, IsNotEmpty} from 'class-validator';
import { ReactionsEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReactionDto extends PartialType(CreateReactionDto) {

    @ApiProperty({
        description: 'The user ID that creates the post',
        example: 1,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsInt({ message: 'Is a int number' })
    @IsInt()
    userId: number;


    @ApiProperty({
        description: 'Enum of Reactions: LIKE, LOVE, WOW, SAD, ANGRY, BASED',
        example: ReactionsEnum.LOVE,
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(ReactionsEnum)
    reaction: ReactionsEnum;
}
