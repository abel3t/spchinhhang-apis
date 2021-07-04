import { Transform, TransformFnParams } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';

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
  @Transform(({ value }: TransformFnParams) => ObjectID(value).toHexString(), {
    toPlainOnly: true
  })
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
