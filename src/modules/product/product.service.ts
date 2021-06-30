import { Injectable } from '@nestjs/common';
import getUnixTime from 'date-fns/getUnixTime';

import { ICustomPagination } from '../../decorators/paging.decorator';
import { Product } from '../../shared/entities/product.entity';
import { ProductRepository } from '../../shared/repositories/product.repesitory';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createNewProduct(productDto: CreateProductDto): Promise<unknown> {
    const product = new Product({
      ...productDto,
      createdAt: getUnixTime(new Date())
    });

    await this.productRepository.save(product);
    return true;
  }

  getAllProducts(paginationOptions: ICustomPagination): Promise<unknown> {
    return this.productRepository.paginate(paginationOptions);
  }
}
