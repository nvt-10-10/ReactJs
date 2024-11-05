import { Category } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { findAll } from 'src/database/query/category';
import { CacheService } from 'src/core/cache/cache.service';

@Injectable()
export class CategoryService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly cacheService: CacheService,
  ) {
    super(categoryRepository);
  }

  async findAll(
    take?: number,
    skip?: number,
    status?: boolean,
    isGetLength: boolean = false,
    select?: (keyof Category)[],
  ): Promise<any> {
    const categoryCache = await this.cacheService.get('getAllCategory');
    if (categoryCache) {
      return categoryCache;
    }
    const result = await findAll(
      this.categoryRepository,
      take,
      skip,
      status,
      isGetLength,
      select,
    );

    await this.cacheService.set('getAllCategory', result, 60 * 60 * 5);
    return result;
  }

  async store(body: CategoryCreateDto, file?: Express.Multer.File) {
    if (file) {
      body.image = '/uploads/images/' + file.filename;
    }
    return await this.categoryRepository.save(body);
  }
}
