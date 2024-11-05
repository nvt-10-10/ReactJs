import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Quote, User } from 'src/entities';
import { QuoteService } from './services/quote.service';
import { QuoteController } from './controllers/quote.controller';
import { QuoteRepository } from './repositories/quote.repository';
import { UserModule } from '../users/user.module';
import { CategoryService } from '../categories/services/category.service';
import { CacheService } from 'src/core/cache/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, User, Category]), UserModule],
  providers: [QuoteService, QuoteRepository, CategoryService, CacheService],
  controllers: [QuoteController],
  exports: [QuoteService],
})
export class quoteModule {}
