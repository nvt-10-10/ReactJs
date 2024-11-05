import {
  Entity,
  Column,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { Role } from './role.entity';
import { Product } from './product.entity';
import { Cart } from './cart.entity';
import { New } from './new.entity';
import { Quote } from './quote.entity';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';

@Entity('users')
export class User extends BaseEntity {
  @Unique(['email'])
  @Column()
  email: string;

  @Column()
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 255,
  })
  slug: string;

  @Column({ name: 'code', type: 'varchar', length: 255 })
  code: string;

  @Column({ length: 50, default: null })
  phone: string;

  @Column({ default: null })
  address: string;

  @Column()
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  authToken: string;

  @Column({ default: null })
  refreshToken: string;

  @Column({ default: false })
  status: boolean;

  @Column({ name: 'country', type: 'int', default: 84 })
  country: number;
  @Column({ default: 1 })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts?: Cart[];

  @OneToMany(() => New, (news) => news.user)
  news?: New[];

  @OneToMany(() => Quote, (quote) => quote.user)
  quotes?: Quote[];
  @BeforeInsert() // Lifecycle hook to set slug before insert
  generateSlug() {
    this.slug = generateSlug(this.name);
    this.code = generateUniqueCode(16);
  }
}
