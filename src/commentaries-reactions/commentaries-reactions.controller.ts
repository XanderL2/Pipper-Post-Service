import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentariesReactionsService } from './commentaries-reactions.service';
import { CreateCommentariesReactionDto } from './dto/create-commentaries-reaction.dto';
import { UpdateCommentariesReactionDto } from './dto/update-commentaries-reaction.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Commentaries Reactions')
@Controller('commentaries-reactions')
export class CommentariesReactionsController {
  constructor(private readonly commentariesReactionsService: CommentariesReactionsService) {}

  @Post()
  create(@Body() createCommentariesReactionDto: CreateCommentariesReactionDto) {
    return this.commentariesReactionsService.create(createCommentariesReactionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentariesReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentariesReactionDto: UpdateCommentariesReactionDto) {
    return this.commentariesReactionsService.update(+id, updateCommentariesReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentariesReactionsService.remove(+id);
  }
}
