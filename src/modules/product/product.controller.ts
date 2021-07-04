import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_MAX_LIMIT } from 'common/constant';
import {
  ICustomPagination,
  PaginationParams
} from 'decorators/paging.decorator';

import { AddProductCategoryDto, CreateProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // region Admin APIs
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new product'
  })
  createNewProduct(@Body() productDto: CreateProductDto): Promise<unknown> {
    return this.productService.createNewProduct(productDto);
  }

  @Put(':productId/categories/:categoryId')
  addProductCategory(
    @Param() productCategoryDto: AddProductCategoryDto
  ): Promise<unknown> {
    return this.productService.addProductCategory(productCategoryDto);
  }
  // endregion

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
}
