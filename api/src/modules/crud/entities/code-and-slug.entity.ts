import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseAndCodeAndSlug extends BaseEntity {
  @Column({
    name: 'slug',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  slug: string;

  @Column({ name: 'code', type: 'varchar', length: 255, nullable: true })
  code: string;
}
