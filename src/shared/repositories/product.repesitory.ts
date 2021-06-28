import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { Product } from '../entities/product.entity';
import { BaseRepository } from './base.repository';

@Injectable()
@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
