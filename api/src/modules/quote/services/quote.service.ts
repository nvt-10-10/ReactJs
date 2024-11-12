import { Quote } from 'src/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { UserService } from '../../users/services/user.service';
import { CategoryService } from 'src/modules/categories/services/category.service';
import { QuoteCreateDto } from '../dto/quote-create.dto';
import { FileCleanupService } from 'src/utils/cleanupFiles';
import { findAll } from 'src/database/query/quote';
import { StatusQuote } from 'src/type/quote.type';

@Injectable()
export class QuoteService extends CrudService<Quote> {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly fileCleanupService: FileCleanupService,
  ) {
    super(quoteRepository);
  }

  async findAll(
    take: number = 10,
    page: number = 1,
    status?: StatusQuote,
  ): Promise<any[]> {
    return await findAll(this.quoteRepository, take, page, status, true);
  }

  async store(
    createQuoteDto: QuoteCreateDto,
    {
      images,
      document,
    }: { images?: Express.Multer.File[]; document?: Express.Multer.File[] },
  ): Promise<any> {
    try {
      const user = await this.userService.findById(createQuoteDto.user_id);
      if (!user) throw new BadRequestException('Tài khoản không tồn tại');
      const categories = await Promise.all(
        createQuoteDto?.category?.map(async (categoryId) => {
          const category = await this.categoryService.findById(categoryId);
          if (!category) {
            throw new BadRequestException(
              `Category with ID ${categoryId} does not exist`,
            );
          }
          return category;
        }),
      );
      const imagePaths = images?.map((file) => file.path) || [];

      // Xử lý tài liệu (chỉ có một file)
      const documentPath = document?.[0]?.path || null; // Lấy đường dẫn của tài liệu đầu tiên nếu có

      const quoteEntity = await this.quoteRepository.create({
        ...createQuoteDto,
        categories,
        images: imagePaths,
        document: documentPath,
      });

      return this.quoteRepository.save(quoteEntity);
    } catch (error) {
      await this.fileCleanupService.cleanupFiles([...images, ...document]);
      console.error('Error in store method:', error); // Log error details
      throw error; // Re-throw the error to propagate it
    }
  }
}
