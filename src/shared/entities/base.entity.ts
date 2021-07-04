import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface IBaseEntity {
  id?: number;
  createdBy?: string;
  createdAt?: number;
  updatedBy?: string;
  updatedAt?: number;
}

export class BaseEntity {
  constructor(props?: IBaseEntity) {
    Object.assign(this, props || {});
  }

  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  createdAt?: number;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  updatedAt?: number;

  @Column()
  isActive?: boolean;
}
