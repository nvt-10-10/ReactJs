
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProduct } from 'src/entities';
import { CategoryProductService } from './services/categoryproduct.service';
import { CategoryProductController } from './controllers/categoryproduct.controller';
import { CategoryProductRepository } from './repositories/categoryproduct.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProduct])],
  providers: [CategoryProductService, CategoryProductRepository],
  controllers: [CategoryProductController],
   exports: [CategoryProductService],
})
export class CategoryProductModule {}
