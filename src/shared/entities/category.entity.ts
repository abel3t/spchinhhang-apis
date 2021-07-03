import { getUnixTime } from 'date-fns';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity, IBaseEntity } from './base.entity';

interface ICategory extends IBaseEntity {
  name?: string;
  seName?: string;
  type?: string;
  description?: string;
  path?: string;
  parentId?: string;
  photo?: string;
}

@Entity('Category')
export class Category extends BaseEntity {
  constructor(props?: ICategory) {
    const {
      name,
      seName,
      type,
      description,
      path,
      parentId,
      photo,
      ...superItem
    } = props || {};

    super(superItem);

    Object.assign(this, {
      name,
      seName,
      type,
      description,
      path,
      parentId,
      photo
    });
  }

  @Column()
  name: string;

  @Column()
  seName: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  path: string;

  @Column()
  parentId: string;

  @Column()
  photo: string;

  @BeforeInsert()
  init(): void {
    this.isActive = true;
    this.createdAt = getUnixTime(new Date());
  }

  @BeforeUpdate()
  update(): void {
    this.updatedAt = getUnixTime(new Date());
  }
}
