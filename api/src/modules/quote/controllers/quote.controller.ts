import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { QuoteService } from '../services/quote.service';
import { QuoteUpdateDto } from '../dto/quote-update.dto';
import { JwtAuthGuard } from 'src/core/decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/ multer-config.service';
import { QuoteCreateDto } from '../dto/quote-create.dto';

@Controller('api/quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quoteService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 }, // Nhận tối đa 5 ảnh
        { name: 'document', maxCount: 1 }, // Nhận một tệp tài liệu
      ],
      new MulterConfigService().createMulterOptions(), // Cấu hình MulterService
    ),
  )
  async create(
    @Body() createDto: QuoteCreateDto,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; document?: Express.Multer.File[] },
  ): Promise<any> {
    await this.quoteService.store(createDto, {
      images: files.images,
      document: files.document,
    });
    return {
      success: true,
      messages: 'Tạo báo giá thành công',
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: QuoteUpdateDto) {
    return this.quoteService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quoteService.delete(id);
  }
}
