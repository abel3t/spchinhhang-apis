import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { DEFAULT_MAX_LIMIT } from '../../constant';
import {
  ICustomPagination,
  PaginationParams
} from '../../decorators/paging.decorator';
import { CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Get all categories'
  })
  getAllCategories(
    @PaginationParams({ maxLimit: DEFAULT_MAX_LIMIT })
    paginationOptions: ICustomPagination
  ): Promise<unknown> {
    return this.categoryService.getAllCategories(paginationOptions);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new category'
  })
  createNewCategory(@Body() categoryDto: CreateCategoryDto): Promise<unknown> {
    return this.categoryService.createNewCategory(categoryDto);
  }
}
