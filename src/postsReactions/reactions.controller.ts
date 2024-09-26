import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { ValidationsService } from 'src/shared/constants/utils/validations.service';
import { PostReactions } from '@prisma/client';

@Controller('/posts/reactions')
export class ReactionsController {


  constructor(
    private readonly reactionsService: ReactionsService,
    private readonly validationsService: ValidationsService
  ) {}

  //TODO: Crear guard de validacion de usuario
  @Post()
  async create(@Body() createReactionDto: CreateReactionDto) {

    if(!await this.validationsService.isAnExistingPostId(createReactionDto.postId)) throw new HttpException('Post not found', HttpStatus.NOT_FOUND)

    const results: PostReactions = await this.reactionsService.createReaction(createReactionDto);

    return {"Infd": "Creation successfully", results}
  }




  // @Get()
  // findAll() {
  //   return this.reactionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReactionDto: UpdateReactionDto) {
  //   return this.reactionsService.update(+id, updateReactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reactionsService.remove(+id);
  // }

}
