import { Quote } from 'src/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { QuoteCreateDto } from '../dto/quote-create.dto';
import { UserService } from '../../users/services/user.service';
import { CategoryService } from 'src/modules/categories/services/category.service';
import { generateSlug } from 'src/utils/generateSlug';
import { generateUniqueCode } from 'src/utils/generateUniqueCode';

@Injectable()
export class QuoteService extends CrudService<Quote> {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {
    super(quoteRepository);
  }
  async store(createQuoteDto: QuoteCreateDto): Promise<any> {
    try {
      const user = await this.userService.findById(createQuoteDto.user_id);
      if (!user) throw new BadRequestException('Tài khoản không tồn tại'); // Use exception instead of return

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

      // Log slug and code generation
      const slug = generateSlug(createQuoteDto.name);
      const code = generateUniqueCode(16);
      console.log('Generated slug and code:', { slug, code });

      const quote = await this.quoteRepository.save({
        ...createQuoteDto,
        slug,
        code,
        categories,
      });

      return quote;
    } catch (error) {
      console.error('Error in store method:', error); // Log error details
      throw error; // Re-throw the error to propagate it
    }
  }
}
