// import { BaseEntity } from 'src/modules/crud/entities/base.entity';
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { Product } from './product.entity';

// @Entity('attributes')
// export class Attribute extends BaseEntity {
//   @Column()
//   name?: string;

//   @ManyToOne(() => Product, (product) => product.attributes)
//   @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
//   product!: Product;
// }
