import { getUnixTime } from 'date-fns';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity, IBaseEntity } from './base.entity';

interface IProduct extends IBaseEntity {
  name?: string;
  seName?: string;
  type?: string;
  price?: string;
  oldPrice?: string;
  shortDescription?: string;
  description?: string;
  sold?: number;
  viewed?: number;
  categories?: string[];
  photos?: string[];
}

@Entity('Product')
export class Product extends BaseEntity {
  constructor(props?: IProduct) {
    const {
      name,
      seName,
      type,
      price,
      oldPrice,
      shortDescription,
      description,
      sold,
      viewed,
      categories,
      photos,
      ...superItem
    } = props || {};
    super(superItem);

    Object.assign(this, {
      name,
      seName,
      type,
      price,
      oldPrice,
      shortDescription,
      description,
      sold,
      viewed,
      categories,
      photos
    });
  }

  @Column()
  name: string;

  @Column()
  seName: string;

  @Column()
  type: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  oldPrice: string;

  @Column()
  shortDescription: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  sold?: number;

  @Column({ default: 0 })
  viewed?: number;

  @Column('array')
  categories: ProductCategory[];

  @Column()
  photos: string[];

  @BeforeInsert()
  init(): void {
    this.categories = [];
    this.isActive = true;
    this.createdAt = getUnixTime(new Date());
  }

  @BeforeUpdate()
  update(): void {
    this.updatedAt = getUnixTime(new Date());
  }
}

class ProductCategory {
  @Column()
  isFeatured: boolean;

  @Column()
  categoryId: string;
}
