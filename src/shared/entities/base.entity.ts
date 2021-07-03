import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export interface IBaseEntity {
  id?: number;
  createdBy?: number;
  createdAt?: number;
  updatedBy?: number;
  updatedAt?: number;
}

export class BaseEntity {
  constructor(props?: IBaseEntity) {
    Object.assign(this, props || {});
  }

  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ nullable: true })
  createdBy?: number;

  @Column({ nullable: true })
  createdAt?: number;

  @Column({ nullable: true })
  updatedBy?: number;

  @Column({ nullable: true })
  updatedAt?: number;

  @Column()
  isActive?: boolean;
}
