import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../core/decorator/auth.decorator';
import { JwtStrategy } from '../auth/JwtStrategy';
import { Category, CategoryProduct, Product } from 'src/entities';
import { CacheService } from 'src/core/cache/cache.service';
import { UserModule } from '../users/user.module';
import { CategoryProductService } from '../categoryproduct/services/categoryproduct.service';
import { CategoryService } from '../categories/services/category.service';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { CategoryProductRepository } from '../categoryproduct/repositories/categoryproduct.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, CategoryProduct]),
    UserModule,
  ],
  providers: [
    ProductService,
    JwtAuthGuard,
    JwtStrategy,
    CacheService,
    CategoryService,
    CategoryRepository,
    CategoryProductRepository,
    CategoryProductService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
