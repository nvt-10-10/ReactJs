import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { StatusNew } from 'src/type';
import { User } from './user.entity';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';
import { BaseAndCodeAndSlug } from 'src/modules/crud/entities/code-and-slug.entity';

@Entity('news')
export class New extends BaseAndCodeAndSlug {
  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

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

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.title);
    this.code = generateUniqueCode(16);
  }
}
