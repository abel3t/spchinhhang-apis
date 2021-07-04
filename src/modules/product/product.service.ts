import { Injectable } from '@nestjs/common';
import { ICustomPagination } from 'decorators/paging.decorator';
import { ObjectID } from 'mongodb';
import { Product } from 'shared/entities/product.entity';
import { ProductRepository } from 'shared/repositories/product.repesitory';

import { AddProductCategoryDto, CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  // region Product APIs
  async createNewProduct(productDto: CreateProductDto): Promise<unknown> {
    await this.productRepository.save(new Product(productDto));
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

  // endregion

  getAllProducts(paginationOptions: ICustomPagination): Promise<unknown> {
    return this.productRepository.paginate(paginationOptions);
  }
}
