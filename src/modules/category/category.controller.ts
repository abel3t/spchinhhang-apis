import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { DEFAULT_MAX_LIMIT, Role } from 'common/constant';
import {
  ICustomPagination,
  PaginationParams
} from 'decorators/paging.decorator';

import { CreateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'decorators/roles.decorator';
import { AuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { CurrentUser } from 'decorators/user.decorator';
import { ICurrentUser } from 'interfaces/ICurrentUser';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // region Admin APIs
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create a new category'
  })
  createNewCategory(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() categoryDto: CreateCategoryDto
  ): Promise<unknown> {
    return this.categoryService.createNewCategory(currentUser.id, categoryDto);
  }
  // endregion

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
}
