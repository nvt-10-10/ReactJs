import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';
import { RolePermission } from './role_permission.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'codeName', type: 'varchar', length: 100, nullable: true })
  codeName: string;

  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @JoinColumn({ name: 'rolePermissions' })
  rolePermissions: RolePermission[];

  @OneToMany(() => User, (user) => user.role)
  @JoinColumn({ name: 'id', referencedColumnName: 'roleId' })
  users: User[];
}
