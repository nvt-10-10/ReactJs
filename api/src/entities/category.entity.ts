import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { CategoryProduct } from './category_product.entity';
import { Quote } from './quote.entity';

@Entity('categories')
export class Category extends BaseEntity {
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
}
