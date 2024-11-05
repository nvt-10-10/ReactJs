import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { JwtAuthGuard, Permissions } from 'src/core/decorator';
import { Cacheable } from 'src/core/decorator/cache.decorator';
import { CustomCacheInterceptor } from 'src/core/interceptors/cache.interceptors';
import { RolePermissions } from 'src/enums';
import { PermissionGuard } from 'src/core/cache/guard/permission.guard';
import { multerImageConfig } from 'src/config/uploadFile.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from '../dto/create-product.dto';
import { StatusProduct } from 'src/type';

@Controller('/api/products')
@UseInterceptors(CustomCacheInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  // @Permissions(RolePermissions.permissionsAdmin)
  // @UseGuards(JwtAuthGuard, PermissionGuard)
  async findAll(): Promise<any[]> {
    const data = await this.productService.findAll();
    return data;
  }

  @Get('/top-6')
  @Cacheable('top6Product')
  async findTop6Product(): Promise<any[]> {
    const data = await this.productService.findAll(
      6,
      1,
      ['id', 'name', 'image', 'description', 'country'],
      'top6Product',
      StatusProduct.ACTIVE,
    );
    return data;
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<any> {
    const data = await this.productService.findById(id);
    return data;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerImageConfig))
  async store(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const result = await this.productService.store(createProductDto, file);
    return result;
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  async update(): Promise<any> {
    return '';
  }
}
