import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus} from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { isValidId, ValidationUtilsService } from 'src/posts/imports';


@Controller('commentaries')
export class CommentariesController {
  constructor(private readonly commentariesService: CommentariesService, private readonly validations: ValidationUtilsService) {}


  //!  POST ID DE PRUEBA          66f05a07a7fd7c8bfcb74d77   
  @Post()
  async create(@Body() createCommentaryDto: CreateCommentaryDto) {
    return await this.commentariesService.createCommentary(createCommentaryDto);
  }

  
  @Get(':postId')
  async findAll(
    @Param('postId', isValidId) postId: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {

    const pageNumber = this.validations.parseIntParams(page, 1);
    const limitNumber = this.validations.parseIntParams(limit, 10);

    const results = await this.commentariesService.findByPostId(postId, pageNumber, limitNumber);

    if(results.length === 0) throw new HttpException('No results found', HttpStatus.NOT_FOUND); 


    return !page || !limit ? { "Info": "You can use query parameters to paginate results", results } : { results };
  }

  @Patch(':commentaryId')
  async updateCommentary(@Param('commentaryId', isValidId) commentaryId: string, @Body() body: UpdateCommentaryDto) {
    return await this.commentariesService.updateCommentaryById(commentaryId, body);
  }

  @Delete(':commentaryId')
  async removeCommentary(@Param('commentaryId', isValidId) commentaryId: string) {
    return await this.commentariesService.removeCommentaryById(commentaryId);
  }

}
