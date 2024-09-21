import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }


  //TODO Crer un guard que permta validar la existancia del usuario haciendo una peticion HTTP
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const results = await this.postsService.createPost(createPostDto)
    return { results };
  }


  @Get()
  async HomePosts(
    @Query('page') page: string,
    @Query('limit',) limit: string,

  ) {

    const pageNumber = this.parseIntParams(page, 1);
    const limitNumber = this.parseIntParams(limit, 10);

    const results = await this.postsService.findHomePosts(pageNumber, limitNumber);

    return !page && !limit ? { "Info": "You can use query parameters to paginate results", results } : { results }
  }


  @Get(':postId')
  async OnePostById(@Param('userId') id: string) {
    return this.postsService.findPostsByUserId;
  }


  @Get('/user/:userId')
  async postsByUserId(
    @Param('userId', ParseIntPipe) userId: number,

    @Query('page') page: string,
    @Query('limit',) limit: string,
  ) {

    const pageNumber = this.parseIntParams(page, 1);
    const limitNumber = this.parseIntParams(limit, 10);

    const results = this.postsService.findPostsByUserId(userId, pageNumber, limitNumber);

    return !page && !limit ? { "Info": "You can use query parameters to paginate results", results } : { results }
  }






















  // @Patch(':id')
  // async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.updatePost(id, updatePostDto);
  // }

  // @Delete(':id')
  // async removePost(@Param('id') id: string) {
  //   return this.postsService.deletePost(id);
  // }


  private parseIntParams(value: string, defectValue: number): number {
    const convertedValue = parseInt(value, 10);
    return isNaN(convertedValue) ? defectValue : convertedValue;
  }


}
