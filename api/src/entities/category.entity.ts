import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { CategoryProduct } from './category_product.entity';
import { Quote } from './quote.entity';
import { User } from './user.entity';
import { BaseAndCodeAndSlug } from 'src/modules/crud/entities/code-and-slug.entity';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';

@Entity('categories')
export class Category extends BaseAndCodeAndSlug {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'image', type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean;

  @OneToMany(
    () => CategoryProduct,
    (categoryProduct) => categoryProduct.category,
  )
  categoryProducts: CategoryProduct[];

  @ManyToMany(() => Quote, (quote) => quote.categories)
  @JoinTable()
  quotes: Quote[];

  @ManyToMany(() => User, (user) => user.categories)
  @JoinTable()
  users: User[];

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.name);
    this.code = generateUniqueCode(16);
  }
}
