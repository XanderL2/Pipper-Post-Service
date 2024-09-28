import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { PostReactions } from '@prisma/client';
import { ValidationUtilsService } from 'src/shared/utils/validations.service';
import { isValidMongoIdPipe} from 'src/common/pipes/ValidateId..pipe';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isAnExistingPostIdPipe } from 'src/common/pipes/isAnExistingPostId.pipe';



@ApiTags('Posts Reactions')
@Controller('/posts/reactions')
export class ReactionsController {

  constructor(
    private readonly reactionsService: ReactionsService,
    private readonly validations: ValidationUtilsService
  ) { }


  @ApiOperation({ summary: 'Create a new reaction' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 201, description: 'Reaction created successfully' })
  @Post()
  async create(@Body() createReactionDto: CreateReactionDto) {

    if (!await this.validations.isAnExistingPostId(createReactionDto.postId)) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const results: PostReactions = await this.reactionsService.createReaction(createReactionDto);
    return { "Infd": "Creation successfully", results };
  }

  @ApiOperation({ summary: 'Fetch reactions by post' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Reactions fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: String, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: String, description: 'Number of results per page' })
  @ApiParam({ name: 'postId', required: true, type: String, description: 'Post ID' })
  @Get(':postId')
  async findReactionsByPost(
    @Param('postId', isValidMongoIdPipe, isAnExistingPostIdPipe) postId: string,
    @Query('page') page: string,
    @Query('limit',) limit: string,
  ) {
    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.reactionsService.fetchReactionsByPost(postId, pageNumber, limitNumber);

    return !page && !limit ? { "Info": "You can use query parameters to paginate results", results } : { results };
  }

  @ApiOperation({ summary: 'Update a reaction by ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Reaction updated successfully' })
  @ApiParam({ name: 'reactionId', required: true, type: String, description: 'Reaction ID' })
  @Patch(':reactionId')
  async updateReaction(
    @Param('reactionId', isValidMongoIdPipe) reactionId: string,
    @Body() body: UpdateReactionDto
  ) {
    return await this.reactionsService.updateReactionById(reactionId, body);
  }

  @ApiOperation({ summary: 'Delete a reaction by ID' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'Reaction deleted successfully' })
  @ApiParam({ name: 'reactionId', required: true, type: String, description: 'Reaction ID' })
  @Delete(':reactionId')
  async remove(@Param('reactionId', isValidMongoIdPipe) reactionId: string) {
    return await this.reactionsService.removeReactionById(reactionId);
  }

}
