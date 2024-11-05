import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/envConfig';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheService } from './core/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './modules/products/product.module';
import { JwtStrategy } from './modules/auth/JwtStrategy';
import { JwtAuthGuard } from './core/decorator';
import { TestModule } from './modules/test/test.module';
import { ImageModule } from './modules/Image/image.module';
import { CategoryModule } from './modules/categories/categories.module';
import { quoteModule } from './modules/quote/quote.module';

@Module({
  imports: [
    CacheModule.register({ ttl: 60, max: 100, isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [envConfig] }),
    DatabaseConfig,
    AuthModule,
    UserModule,
    ProductModule,
    TestModule,
    CategoryModule,
    ImageModule,
    quoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService, JwtAuthGuard, JwtStrategy],
  exports: [CacheService],
})
export class AppModule {}
