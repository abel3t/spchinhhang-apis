import { BadRequestException, Injectable } from '@nestjs/common';
import { ICustomPagination } from 'decorators/paging.decorator';
import { ObjectID } from 'mongodb';
import { Category } from 'shared/entities/category.entity';
import { CategoryRepository } from 'shared/repositories/category.repository';

import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  // region Admin APIs
  async createNewCategory(
    userId: string,
    categoryDto: CreateCategoryDto
  ): Promise<unknown> {
    if (categoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        _id: ObjectID(categoryDto.parentId)
      });
      if (!parentCategory) {
        throw new BadRequestException('Invalid parentId');
      }
      categoryDto.path =
        (parentCategory.path || ',') + `${parentCategory._id},`;
    }

    return this.categoryRepository.save({
      ...new Category(categoryDto),
      createdBy: userId
    });
  }

  async getAllCategories(
    paginationOptions: ICustomPagination
  ): Promise<unknown> {
    return this.categoryRepository.paginate(paginationOptions);
  }
  // endregion
}
