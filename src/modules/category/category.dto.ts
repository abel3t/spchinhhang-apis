import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Laptop HP',
    description: 'The name of category'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Laptop',
    description: 'The type of category'
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'Laptop HP like new',
    description: 'Description'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '60bdbbf92339455d3d5f84d7',
    description: 'The parentId of category'
  })
  @IsString()
  @IsOptional()
  parentId: string;

  @ApiProperty({
    example:
      'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg',
    description: 'The photo of category'
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    example: ',60bdbbf92339455d3d5f84d7,',
    description: 'The path of category'
  })
  @IsString()
  @IsOptional()
  path: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Laptop HP',
    description: 'The name of category'
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'Laptop',
    description: 'The type of category'
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    example: 'Laptop HP like new',
    description: 'Description'
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: '60bdbbf92339455d3d5f84d7',
    description: 'The parentId of category'
  })
  @IsString()
  @IsOptional()
  parentId: string;

  @ApiProperty({
    example:
      'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg',
    description: 'The photo of category'
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    example: ',60bdbbf92339455d3d5f84d7,',
    description: 'The path of category'
  })
  @IsString()
  @IsOptional()
  path: string;
}
