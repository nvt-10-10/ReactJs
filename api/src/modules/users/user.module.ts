import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { CacheService } from 'src/core/cache/cache.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CacheService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
