import { Injectable } from '@nestjs/common';
import { ICustomPagination } from 'decorators/paging.decorator';
import { ObjectID } from 'mongodb';
import { Product } from 'shared/entities/product.entity';
import { ProductRepository } from 'shared/repositories/product.repesitory';

import {
  AddProductCategoryDto,
  CreateProductDto,
  UpdateProductDto
} from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  // region Product APIs
  async createNewProduct(
    userId: string,
    productDto: CreateProductDto
  ): Promise<unknown> {
    await this.productRepository.save({
      createdBy: userId,
      ...new Product(productDto)
    });
    return true;
  }

  async updateProduct({
    userId,
    productId,
    productDto
  }: IUpdateProduct): Promise<unknown> {
    await this.productRepository.findOneAndUpdate(
      { _id: productId, isActive: true },
      {
        updatedBy: userId,
        ...productDto
      }
    );
    return true;
  }
  async addProductCategory({
    productId,
    categoryId
  }: AddProductCategoryDto): Promise<unknown> {
    return await this.productRepository.findOneAndUpdate(
      {
        _id: ObjectID(productId)
      },
      {
        $push: {
          categories: {
            categoryId,
            isFeatured: false
          }
        }
      }
    );
  }

  async removeProductCategory({
    productId,
    categoryId
  }: AddProductCategoryDto): Promise<unknown> {
    return await this.productRepository.findOneAndUpdate(
      {
        _id: ObjectID(productId)
      },
      {
        $pull: {
          categories: {
            categoryId
          }
        }
      }
    );
  }

  // endregion

  getAllProducts(paginationOptions: ICustomPagination): Promise<unknown> {
    return this.productRepository.paginate(paginationOptions);
  }
}

interface IUpdateProduct {
  userId: string;
  productId: string;
  productDto: UpdateProductDto;
}
