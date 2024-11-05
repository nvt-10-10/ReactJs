import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from '../services/quote.service';
import { QuoteCreateDto } from '../dto/quote-create.dto';
import { QuoteUpdateDto } from '../dto/quote-update.dto';
import { JwtAuthGuard } from 'src/core/decorator';

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
  async create(@Body() createDto: QuoteCreateDto): Promise<any> {
    await this.quoteService.store(createDto);
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
