import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { StatusProduct } from 'src/type';
import { CategoryProduct } from './category_product.entity';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';
@Entity('products')
export class Product extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  code!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  slug!: string;

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

  @OneToMany(
    () => CategoryProduct,
    (categoryProduct) => categoryProduct.product,
  )
  categoryProducts: CategoryProduct[];

  @BeforeInsert()
  generateSlug() {
    this.slug = generateSlug(this.name);
    this.code = generateUniqueCode(16);
  }
}
