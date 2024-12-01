import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Quote, User } from 'src/entities';
import { QuoteService } from './services/quote.service';
import { QuoteController } from './controllers/quote.controller';
import { QuoteRepository } from './repositories/quote.repository';
import { UserModule } from '../users/user.module';
import { CategoryService } from '../categories/services/category.service';
import { CacheService } from 'src/core/cache/cache.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/ multer-config.service';
import { FileCleanupService } from 'src/utils/cleanupFiles';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote, User, Category]),
    UserModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService, // Sử dụng MulterConfigService để cấu hình Multer
    }),
  ],
  providers: [
    QuoteService,
    QuoteRepository,
    CategoryService,
    CacheService,
    FileCleanupService,
  ],
  controllers: [QuoteController],
  exports: [QuoteService],
})
export class quoteModule {}
