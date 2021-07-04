import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_MAX_LIMIT, Role } from 'common/constant';
import {
  ICustomPagination,
  PaginationParams
} from 'decorators/paging.decorator';
import { Roles } from 'decorators/roles.decorator';
import { CurrentUser } from 'decorators/user.decorator';
import { AuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { ICurrentUser } from 'interfaces/ICurrentUser';

import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

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

  @Put(':categoryId')
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Update a category'
  })
  updateCategory(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('categoryId') categoryId: string,
    @Body() categoryDto: UpdateCategoryDto
  ): Promise<unknown> {
    return this.categoryService.updateCategory({
      userId: currentUser.id,
      categoryId,
      categoryDto
    });
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
