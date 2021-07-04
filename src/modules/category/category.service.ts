import { BadRequestException, Injectable } from '@nestjs/common';
import { unixTime } from 'common/utils';
import { ICustomPagination } from 'decorators/paging.decorator';
import { ObjectID } from 'mongodb';
import { Category } from 'shared/entities/category.entity';
import { CategoryRepository } from 'shared/repositories/category.repository';

import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

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
        _id: categoryDto.parentId
      });
      if (!parentCategory) {
        throw new BadRequestException('Invalid parentId');
      }
      categoryDto.path =
        (parentCategory.path || ',') + `${parentCategory._id},`;
    }

    await this.categoryRepository.save(
      new Category({ ...categoryDto, createdBy: userId })
    );

    return true;
  }

  async updateCategory({
    userId,
    categoryId,
    categoryDto
  }: IUpdateCategory): Promise<unknown> {
    if (categoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        _id: categoryDto.parentId
      });
      if (!parentCategory) {
        throw new BadRequestException('Invalid parentId');
      }
      categoryDto.path =
        (parentCategory.path || ',') + `${parentCategory._id},`;
    }

    await this.categoryRepository.update(
      { _id: ObjectID(categoryId), isActive: true },
      {
        updatedBy: userId,
        updatedAt: unixTime(),
        ...categoryDto
      }
    );

    return true;
  }

  // endregion

  getAllCategories(paginationOptions: ICustomPagination): Promise<unknown> {
    return this.categoryRepository.paginate(paginationOptions);
  }
}

interface IUpdateCategory {
  userId: string;
  categoryId: string;
  categoryDto: UpdateCategoryDto;
}
