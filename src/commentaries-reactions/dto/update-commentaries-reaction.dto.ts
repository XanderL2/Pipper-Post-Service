import { PartialType } from '@nestjs/swagger';
import { CreateCommentariesReactionDto } from './create-commentaries-reaction.dto';

export class UpdateCommentariesReactionDto extends PartialType(CreateCommentariesReactionDto) {}
