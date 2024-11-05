import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';

@Entity('testes')
export class Test extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'codeName', type: 'varchar', length: 100, nullable: true })
  codeName: string;

  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean;
}
