import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { RolePermission } from './role_permission.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'codeName', type: 'varchar', length: 100, nullable: true })
  codeName: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  @JoinColumn({ name: 'rolePermissions' })
  rolePermissions: RolePermission[];
}
