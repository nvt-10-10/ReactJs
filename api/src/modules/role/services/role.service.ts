import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { CrudService } from 'src/modules/crud/crud.service';
import { RolePermission } from 'src/entities';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {
    super(roleRepository);
  }
}
