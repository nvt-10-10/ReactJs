import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from 'src/entities';
import { NewService } from './services/new.service';
import { NewController } from './controllers/new.controller';
import { NewRepository } from './repositories/new.repository';

@Module({
  imports: [TypeOrmModule.forFeature([New])],
  providers: [NewService, NewRepository],
  controllers: [NewController],
  exports: [NewService],
})
export class NewsModule {}
