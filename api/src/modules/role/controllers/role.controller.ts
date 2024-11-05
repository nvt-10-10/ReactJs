import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from '../services/role.service';

@Controller('/api/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<any[]> {
    const data = await this.roleService.findAll();
    return data;
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<any> {
    const data = await this.roleService.findById(id);
    return data;
  }
}
