import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Cacheable } from 'src/core/decorator/cache.decorator';
import { MulterConfigService } from 'src/config/ multer-config.service';
import { JwtAuthGuard } from 'src/core/decorator';

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'image', maxCount: 1 }],
      new MulterConfigService().createMulterOptions(),
    ),
  )
  @Post()
  create(
    @UploadedFiles()
    files: { image?: Express.Multer.File[] },
    @Body() createDto: CategoryCreateDto,
  ) {
    console.log('co vao', files);

    const result = this.categoryService.store(createDto, files.image);
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
