import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { DEFAULT_MAX_LIMIT } from '../../constant';
import {
  ICustomPagination,
  PaginationParams
} from '../../decorators/paging.decorator';
import { CreateProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Get all products'
  })
  getAllProducts(
    @PaginationParams({ maxLimit: DEFAULT_MAX_LIMIT })
    paginationOptions: ICustomPagination
  ): Promise<unknown> {
    return this.productService.getAllProducts(paginationOptions);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new product'
  })
  createNewProduct(@Body() productDto: CreateProductDto): Promise<unknown> {
    return this.productService.createNewProduct(productDto);
  }
}
