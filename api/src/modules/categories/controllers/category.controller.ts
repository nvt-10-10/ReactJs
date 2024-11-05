import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageConfig } from 'src/config/uploadFile.config';
import { Cacheable } from 'src/core/decorator/cache.decorator';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Cacheable('getAllCategory')
  async findAll() {
    const [data, count] = await this.categoryService.findAll(
      undefined,
      undefined,
      true,
      true,
    );
    return { data, count };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }
  @UseInterceptors(FileInterceptor('image', multerImageConfig))
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CategoryCreateDto,
  ) {
    const result = this.categoryService.store(createDto, file);
    return {
      success: true,
      result,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: CategoryUpdateDto) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
