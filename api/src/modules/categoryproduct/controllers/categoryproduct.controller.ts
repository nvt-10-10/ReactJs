
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryProductService } from '../services/categoryproduct.service';
import { CategoryProductCreateDto } from '../dto/categoryproduct-create.dto';
import { CategoryProductUpdateDto } from '../dto/categoryproduct-update.dto';

@Controller('api/category_product')
export class CategoryProductController {
  constructor(private readonly categoryproductService: CategoryProductService) {}

  @Get()
  findAll() {
    return this.categoryproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryproductService.findById(id);
  }

  @Post()
  create(@Body() createDto: CategoryProductCreateDto) {
    return this.categoryproductService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: CategoryProductUpdateDto) {
    return this.categoryproductService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryproductService.delete(id);
  }
}
