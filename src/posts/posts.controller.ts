import { isAnExistingPostIdPipe } from 'src/common/pipes/isAnExistingPostId.pipe';
import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe,
  ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags,
  PostsService, CreatePostDto, UpdatePostDto, isValidMongoIdPipe, ValidationUtilsService
} from './imports';  



@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsSvc: PostsService,
    private readonly validations: ValidationUtilsService,
  ) {

  }


  //TODO Crer un guard que permta validar la existancia del usuario haciendo una peticion HTTP
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const results = await this.postsSvc.createPost(createPostDto);
    return { results };
  }




  @ApiOperation({ summary: 'Get home posts!' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Posts fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of posts per page' })
  @Get()
  async homePosts(
    @Query('page') page: string,
    @Query('limit',) limit: string,
  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.postsSvc.findHomePosts(pageNumber, limitNumber);

    return !page || !limit ? { "Info": "You can use query parameters to paginate results", results } : { results };

  }


  @ApiOperation({ summary: 'Get posts by user ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Posts fetched successfully' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID', required: true })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of posts per page' })
  @Get('/user/:userId')
  async postsByUserId(
    @Param('userId', ParseIntPipe) userId: number,

    @Query('page') page: string,
    @Query('limit',) limit: string,
  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.postsSvc.findPostsByUserId(userId, pageNumber, limitNumber);

    return !page && !limit ? { "Info": "You can use query parameters to paginate results", results } : { results };
  }

  //TODO Crer un guard que permta validar la existancia del usuario haciendo una peticion HTTP


  @ApiOperation({ summary: 'Get one post by Post ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Posts fetched successfully' })
  @ApiParam({ name: 'postId', type: String, description: 'Post ID', required: true })
  @Get(':postId')
  async onePostById(@Param('postId', isValidMongoIdPipe) postId: string) {
    return { results: await this.postsSvc.findOnePost(postId) };
  }



  @ApiOperation({ summary: 'Update one post by Post ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Posts updated successfully' })
  @ApiParam({ name: 'postId', type: String, description: 'Post ID', required: true })
  @Patch(':postId')
  async updatePost(
    @Param('postId', isValidMongoIdPipe, isAnExistingPostIdPipe) postId: string, @Body() data: UpdatePostDto
  ) {
    return { results: await this.postsSvc.updatePost(postId, data) };
  }


  @ApiOperation({ summary: 'Delete one post by Post ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Posts deleted successfully' })
  @ApiParam({ name: 'postId', type: String, description: 'Post ID', required: true })
  @Delete(':postId')
  async removePost(
    @Param('postId', isValidMongoIdPipe, isAnExistingPostIdPipe) postId: string
  ) {
    return this.postsSvc.deletePost(postId);
  }

}
