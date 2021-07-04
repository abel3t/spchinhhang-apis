import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_MAX_LIMIT } from 'common/constant';
import {
  ICustomPagination,
  PaginationParams
} from 'decorators/paging.decorator';

import {
  AddProductCategoryDto,
  CreateProductDto,
  UpdateProductDto
} from './product.dto';
import { ProductService } from './product.service';
import { CurrentUser } from 'decorators/user.decorator';
import { ICurrentUser } from 'interfaces/ICurrentUser';

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
  createNewProduct(
    @CurrentUser() user: ICurrentUser,
    @Body() productDto: CreateProductDto
  ): Promise<unknown> {
    return this.productService.createNewProduct(user.id, productDto);
  }

  @Put(':productId')
  @ApiResponse({
    status: 201,
    description: 'Update a product'
  })
  updateProduct(
    @CurrentUser() user: ICurrentUser,
    @Param('productId') productId: string,
    @Body() productDto: UpdateProductDto
  ): Promise<unknown> {
    return this.productService.updateProduct({
      userId: user.id,
      productId,
      productDto
    });
  }

  @Put(':productId/categories/:categoryId')
  addProductCategory(
    @Param() productCategoryDto: AddProductCategoryDto
  ): Promise<unknown> {
    return this.productService.addProductCategory(productCategoryDto);
  }

  @Delete(':productId/categories/:categoryId')
  removeProductCategory(
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
