import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { StatusNew } from 'src/type';
import { User } from './user.entity';

@Entity('news')
export class New extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ name: 'code', type: 'varchar', length: 100, nullable: true })
  code: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, nullable: true })
  slug: string;

  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({
    name: 'status',
    type: 'int',
    nullable: false,
    default: StatusNew.INACTIVE,
  })
  status: StatusNew;

  @ManyToOne(() => User, (user) => user.news)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
