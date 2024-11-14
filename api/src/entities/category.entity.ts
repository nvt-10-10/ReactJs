import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';
import { BaseAndCodeAndSlug } from 'src/modules/crud/entities/code-and-slug.entity';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends BaseAndCodeAndSlug {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'image', type: 'varchar', length: 100, nullable: true })
  image: string;

  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean;

  @ManyToMany(() => Quote, (quote) => quote.categories)
  @JoinTable({
    name: 'category_quote', // Tên bảng liên kết được tùy chỉnh
    joinColumns: [{ name: 'quoteId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'categoryId', referencedColumnName: 'id' }],
  })
  quotes: Quote[];

  @ManyToMany(() => User, (user) => user.categories)
  @JoinTable({
    name: 'category_user', // Tên bảng liên kết được tùy chỉnh
    joinColumns: [{ name: 'categoryId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'userId', referencedColumnName: 'id' }],
  })
  users: User[];

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: 'category_product', // Tên bảng liên kết được tùy chỉnh
    joinColumns: [{ name: 'productId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'categoryId', referencedColumnName: 'id' }],
  })
  products: Product[];

  @BeforeInsert()
  generateSlugAndSlug() {
    this.slug = generateSlug(this.name);
    this.code = generateUniqueCode(16);
  }

  @BeforeUpdate()
  updateSlug() {
    this.slug = generateSlug(this.name);
  }
}
