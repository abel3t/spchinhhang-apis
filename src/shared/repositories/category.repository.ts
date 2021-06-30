import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { Category } from '../entities/category.entity';
import { BaseRepository } from './base.repository';

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {}
