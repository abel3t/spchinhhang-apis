import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 64, nullable: true })
  name: string;

  @Column({ type: 'varchar', width: 64, nullable: true })
  password: string;

  @Column({ type: 'varchar', width: 64, nullable: true })
  role: string;
}
