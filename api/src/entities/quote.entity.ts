import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { StatusQuote } from 'src/type/quote,type';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';
import { generateSlug } from 'src/utils/generateSlug';
import { BaseAndCodeAndSlug } from 'src/modules/crud/entities/code-and-slug.entity';

@Entity('quotes')
export class Quote extends BaseAndCodeAndSlug {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'quantity', type: 'int', nullable: true })
  quantity: number;

  @Column({ name: 'unit', type: 'varchar', length: 255, nullable: true })
  unit: string;

  @Column({ name: 'price', type: 'float', nullable: true })
  price: number;

  @Column({ name: 'price_unit', type: 'float', nullable: true })
  price_unit: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusQuote,
    default: StatusQuote.INACTIVE,
    nullable: false,
  })
  status: StatusQuote;

  @ManyToMany(() => Category, (category) => category.quotes)
  categories: Category[];

  @ManyToOne(() => User, (user) => user.quotes)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.name);
    this.code = generateUniqueCode(16);
  }
}
