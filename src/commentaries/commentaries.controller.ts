import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus} from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, isValidMongoIdPipe, ValidationUtilsService } from 'src/posts/imports';
import { isAnExistingPostIdPipe } from 'src/common/pipes/isAnExistingPostId.pipe';


@ApiTags('Commentaries')
@Controller('commentaries')
export class CommentariesController {
  constructor(
    private readonly commentariesService: CommentariesService, 
    private readonly validations: ValidationUtilsService,
    private readonly validationService: ValidationUtilsService 
  ) {}


  //!  POST ID DE PRUEBA          66f05a07a7fd7c8bfcb74d77   
  @ApiOperation({ summary: 'Create a new commentary' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Commentary created successfully' })
  @Post()
  async create(@Body() body: CreateCommentaryDto) {

    if(! await this.validationService.isAnExistingPostId(body.postId)){
      throw new HttpException('PostId is not found', HttpStatus.NOT_FOUND);
    }

    return await this.commentariesService.createCommentary(body);
  }

 
  @ApiOperation({ summary: 'Get commentaries' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Commentary created successfully' })
  @ApiQuery({ name: 'page', required: false, type: String, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: String, description: 'Limit of results' })
  @ApiParam({ name: 'postId', type: String, description: 'Post ID' })
  @Get(':postId')
  async findAll(
    @Param('postId', isValidMongoIdPipe, isAnExistingPostIdPipe) postId: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.commentariesService.findByPostId(postId, pageNumber, limitNumber);

    if(results.length === 0) throw new HttpException('No results found', HttpStatus.NOT_FOUND); 


    return !page || !limit ? { "Info": "You can use query parameters to paginate results", results } : { results };
  }


  @ApiOperation({ summary: 'Update a commentary' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Commentary updated successfully' })
  @ApiParam({ name: 'commentaryId', type: String, description: 'Commentary ID' })
  @Patch(':commentaryId')
  async updateCommentary(@Param('commentaryId', isValidMongoIdPipe) commentaryId: string, @Body() body: UpdateCommentaryDto) {
    return await this.commentariesService.updateCommentaryById(commentaryId, body);
  }
  

  @ApiOperation({ summary: 'Delete a commentary' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Commentary updated successfully' })
  @ApiParam({ name: 'commentaryId', type: String, description: 'Commentary ID' })
  @Delete(':commentaryId')
  async removeCommentary(@Param('commentaryId', isValidMongoIdPipe) commentaryId: string) {
    return await this.commentariesService.removeCommentaryById(commentaryId);
  }

}
