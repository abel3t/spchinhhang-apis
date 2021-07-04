import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_MAX_LIMIT, Role } from 'common/constant';
import {
  ICustomPagination,
  PaginationParams
} from 'decorators/paging.decorator';
import { Roles } from 'decorators/roles.decorator';
import { CurrentUser } from 'decorators/user.decorator';
import { AuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { ICurrentUser } from 'interfaces/ICurrentUser';

import {
  AddProductCategoryDto,
  CreateProductDto,
  UpdateProductDto
} from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // region Admin APIs
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
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
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
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
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  addProductCategory(
    @CurrentUser() user: ICurrentUser,
    @Param() productCategoryDto: AddProductCategoryDto
  ): Promise<unknown> {
    return this.productService.addProductCategory(user.id, productCategoryDto);
  }

  @Delete(':productId/categories/:categoryId')
  @Roles(Role.ADMIN)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  removeProductCategory(
    @CurrentUser() user: ICurrentUser,
    @Param() productCategoryDto: AddProductCategoryDto
  ): Promise<unknown> {
    return this.productService.removeProductCategory(
      user.id,
      productCategoryDto
    );
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
