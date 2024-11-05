import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { Role } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../core/decorator/auth.decorator';
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, JwtAuthGuard],
  controllers: [RoleController],
  exports: [JwtAuthGuard],
})
export class RoleModule {}
