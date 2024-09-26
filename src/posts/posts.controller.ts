import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ValidationsService } from 'src/shared/constants/utils/validations.service';
import { isValidId } from 'src/common/pipes/ValidateId..pipe';
import { CLIENT_RENEG_LIMIT } from 'tls';


@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly validations: ValidationsService
  ) {

  }


  //TODO Crer un guard que permta validar la existancia del usuario haciendo una peticion HTTP
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const results = await this.postsService.createPost(createPostDto)
    return { results };
  }

  @Get()
  async homePosts(
    @Query('page') page: string,
    @Query('limit',) limit: string,

  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.postsService.findHomePosts(pageNumber, limitNumber);

    return !page || !limit ? { "Info": "You can use query parameters to paginate results", results } : { results }
  }

  @Get('/user/:userId')
  async postsByUserId(
    @Param('userId', ParseIntPipe) userId: number,

    @Query('page') page: string,
    @Query('limit',) limit: string,
  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.postsService.findPostsByUserId(userId, pageNumber, limitNumber);

    return !page && !limit ? { "Info": "You can use query parameters to paginate results", results } : { results }
  }

  //TODO Crer un guard que permta validar la existancia del usuario haciendo una peticion HTTP
  @Get(':postId')
  async onePostById(@Param('postId', isValidId) postId: string) {
    return { results: await this.postsService.findOnePost(postId) };
  }

  @Patch(':id')
  async updatePost(@Param('id', isValidId) id: string, @Body() data: UpdatePostDto) {
    return { results: await this.postsService.updatePost(id, data) };
  }

  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

}
