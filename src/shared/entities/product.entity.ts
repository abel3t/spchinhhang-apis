import { Column, Entity } from 'typeorm';

import { BaseEntity, IBaseEntity } from './base.entity';

interface IProduct extends IBaseEntity {
  name: string;
  type: string;
  price: string;
  oldPrice?: string;
  shortDescription: string;
  description: string;
  sold?: number;
  viewed?: number;
  categories?: string[];
  photos: string[];
}

@Entity('Product')
export class Product extends BaseEntity {
  constructor(props?: IProduct) {
    const {
      name,
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

  @Column({ default: [] })
  categories?: unknown[];

  @Column()
  photos?: unknown[];
}
