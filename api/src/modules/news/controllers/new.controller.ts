
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NewService } from '../services/new.service';
import { NewCreateDto } from '../dto/new-create.dto';
import { NewUpdateDto } from '../dto/new-update.dto';

@Controller('api/news')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get()
  findAll() {
    return this.newService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newService.findById(id);
  }

  @Post()
  create(@Body() createDto: NewCreateDto) {
    return this.newService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: NewUpdateDto) {
    return this.newService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newService.delete(id);
  }
}
