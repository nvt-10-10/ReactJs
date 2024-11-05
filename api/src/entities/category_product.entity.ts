import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity('category_product')
export class CategoryProduct extends BaseEntity {
  @ManyToOne(() => Category, (category) => category.categoryProducts)
  category: Category;

  @ManyToOne(() => Product, (product) => product.categoryProducts)
  product: Product;
}
