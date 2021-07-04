import { Injectable } from '@nestjs/common';
import { toObjectId, unixTime } from 'common/utils';
import { ICustomPagination } from 'decorators/paging.decorator';
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
    await this.productRepository.save(
      new Product({ ...productDto, createdBy: userId })
    );
    return true;
  }

  async updateProduct({
    userId,
    productId,
    productDto
  }: IUpdateProduct): Promise<unknown> {
    await this.productRepository.findOneAndUpdate(
      { _id: toObjectId(productId), isActive: true },
      {
        $set: {
          updatedBy: userId,
          updatedAt: unixTime(),
          ...productDto
        }
      }
    );
    return true;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    await this.productRepository.deleteOne({ _id: toObjectId(productId) });
    return true;
  }

  async addProductCategory(
    userId: string,
    { productId, categoryId }: AddProductCategoryDto
  ): Promise<unknown> {
    await this.productRepository.findOneAndUpdate(
      {
        _id: toObjectId(productId)
      },
      {
        $push: {
          categories: {
            categoryId,
            isFeatured: false
          }
        },
        $set: {
          UpdatedBy: userId,
          updatedAt: unixTime()
        }
      }
    );

    return true;
  }

  async removeProductCategory(
    userId: string,
    { productId, categoryId }: AddProductCategoryDto
  ): Promise<unknown> {
    await this.productRepository.findOneAndUpdate(
      {
        _id: toObjectId(productId)
      },
      {
        $pull: {
          categories: {
            categoryId
          }
        },
        $set: {
          updatedBy: userId,
          updatedAt: unixTime()
        }
      }
    );
    return true;
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
