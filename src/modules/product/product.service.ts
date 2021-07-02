import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { ICustomPagination } from '../../decorators/paging.decorator';
import { Product } from '../../shared/entities/product.entity';
import { ProductRepository } from '../../shared/repositories/product.repesitory';
import { AddProductCategoryDto, CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createNewProduct(productDto: CreateProductDto): Promise<unknown> {
    await this.productRepository.save(new Product(productDto));
    return true;
  }

  getAllProducts(paginationOptions: ICustomPagination): Promise<unknown> {
    return this.productRepository.paginate(paginationOptions);
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
}
