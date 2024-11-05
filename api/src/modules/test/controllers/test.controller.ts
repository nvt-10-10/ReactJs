
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TestService } from '../services/test.service';
import { TestCreateDto } from '../dto/test-create.dto';
import { TestUpdateDto } from '../dto/test-update.dto';

@Controller('api/testes')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testService.findById(id);
  }

  @Post()
  create(@Body() createDto: TestCreateDto) {
    return this.testService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: TestUpdateDto) {
    return this.testService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.testService.delete(id);
  }
}
