import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { isValidMongoIdPipe } from 'src/common/pipes/ValidateId..pipe';
import { ValidationUtilsService } from '../shared/utils/validations.service';




export {
    Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe,
    ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags,
    PostsService, CreatePostDto, UpdatePostDto, isValidMongoIdPipe, ValidationUtilsService
};
