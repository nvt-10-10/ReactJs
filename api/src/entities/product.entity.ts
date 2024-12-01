import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { StatusProduct } from 'src/type';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';
import { BaseAndCodeAndSlug } from 'src/modules/crud/entities/code-and-slug.entity';
import { Category } from './category.entity';
@Entity('products')
export class Product extends BaseAndCodeAndSlug {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'varchar', default: 0 })
  image: string;

  @Column({ type: 'boolean', default: 84 })
  country: number;

  @Column({ type: 'enum', enum: StatusProduct, default: StatusProduct.PENDING })
  status: StatusProduct;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts?: Cart[];

  @ManyToMany(() => Category, (category) => category.products)
  categories?: Category[];

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
