import { BadRequestException, Injectable } from '@nestjs/common';
import getUnixTime from 'date-fns/getUnixTime';

import { Category } from '../../shared/entities/category.entity';
import { CategoryRepository } from '../../shared/repositories/category.repository';
import { CreateCategoryDto } from './category.dto';
import { ICustomPagination } from '../../decorators/paging.decorator';
@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createNewCategory(categoryDto: CreateCategoryDto): Promise<unknown> {
    if (categoryDto.parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { _id: categoryDto.parentId }
      });
      if (!parentCategory) {
        throw new BadRequestException('Invalid parentId');
      }
      categoryDto.path =
        (parentCategory.path || ',') + `${parentCategory._id},`;
    }

    return this.categoryRepository.save(
      new Category({
        ...categoryDto,
        createdAt: getUnixTime(new Date())
      })
    );
  }

  async getAllCategories(
    paginationOptions: ICustomPagination
  ): Promise<unknown> {
    return this.categoryRepository.paginate(paginationOptions);
  }
}
