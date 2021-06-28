import { Module } from '@nestjs/common';

import { ProductRepository } from '../../shared/repositories/product.repesitory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
