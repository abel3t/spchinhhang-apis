import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop HP Envy 13-ba1027TU 2K0B1PA',
    description: 'The name of product'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laptop',
    description: 'The type of product'
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example:
      'Core i5-1135G7/ 8GB DDR4 3200MHz (Onboard)/ 256GB PCIe NVMe M.2/ 13.3 FHD IPS/ Win10',
    description: 'Short description'
  })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty({
    example: 'CPU: Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB ',
    description: 'Full description'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '21.199.000',
    description: 'The price of product'
  })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: '22.199.000',
    description: 'The old price of product'
  })
  @IsOptional()
  oldPrice?: string;

  @ApiProperty({
    example: [
      'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg'
    ],
    description: 'The photos of product'
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(99)
  photos: string[];
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'Laptop HP Envy 13-ba1027TU 2K0B1PA',
    description: 'The name of product'
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'Laptop',
    description: 'The type of product'
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    example:
      'Core i5-1135G7/ 8GB DDR4 3200MHz (Onboard)/ 256GB PCIe NVMe M.2/ 13.3 FHD IPS/ Win10',
    description: 'Short description'
  })
  @IsString()
  @IsOptional()
  shortDescription: string;

  @ApiProperty({
    example: 'CPU: Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB ',
    description: 'Full description'
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: '21.199.000',
    description: 'The price of product'
  })
  @IsOptional()
  price: string;

  @ApiProperty({
    example: '22.199.000',
    description: 'The old price of product'
  })
  @IsOptional()
  oldPrice?: string;

  @ApiProperty({
    example: [
      'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg'
    ],
    description: 'The photos of product'
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(99)
  photos: string[];
}

export class AddProductCategoryDto {
  @ApiProperty({
    example: '60bdbbf92339455d3d5f84d7',
    description: 'The ObjectID of product'
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: '60bdbbf92339455d3d5f84d8',
    description: 'The ObjectID of category'
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
