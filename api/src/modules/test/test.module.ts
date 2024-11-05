import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/entities';
import { TestService } from './services/test.service';
import { TestController } from './controllers/test.controller';
import { TestRepository } from './repositories/test.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [TestService, TestRepository],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
