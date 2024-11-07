import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard, Permissions } from 'src/core/decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImageConfig } from 'src/config/uploadFile.config';
import { Cacheable } from 'src/core/decorator/cache.decorator';
import { CustomCacheInterceptor } from 'src/core/interceptors/cache.interceptors';
import { PermissionGuard } from 'src/core/cache/guard/permission.guard';
import { Auth } from 'src/decorators';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Paginate } from 'src/utils';

@Controller('/api/users')
@UseInterceptors(CustomCacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Cacheable('usersAll')
  @Permissions(999)
  @UseGuards(PermissionGuard)
  async findAll(): Promise<any[]> {
    const data = await this.userService.findAll();
    data.forEach((item) => {
      delete item.password;
    });
    return data;
  }
  @Get('/top-4')
  @Cacheable('top4User')
  @Permissions(999)
  async find4User(): Promise<any> {
    const [data, total] = await this.userService.findAll(
      4,
      1,
      undefined,
      undefined,
      undefined,
      'top4User',
      2,
    );
    data.forEach((item) => {
      delete item.password;
    });
    return {
      data,
      success: true,
      total,
      msg: 'Success',
    };
  }

  @Get('/top-12')
  @Permissions(999)
  async find9User(
    @Query('page') page?: number,
    @Query('category') category?: string,
    @Query('country') country?: number,
    @Query('search') search?: string,
  ): Promise<any> {
    const pageNumber = page || 1;
    const cacheKey = `top12User-${pageNumber}-${category || 'all'}-${country || 'all'}-${search || 'all'}`;
    const [data, total] = await this.userService.findAll(
      12,
      pageNumber,
      search,
      country,
      category,
      cacheKey,
    );
    data.forEach((item) => {
      delete item.password;
    });
    return {
      data: new Paginate(data, total, page, 12),
      success: true,
      msg: 'Success',
    };
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<any> {
    const data = await this.userService.findById(id);
    delete data.password;
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get('/getPermission/:id')
  async findPermissionByUserId(@Param('id') userId: number) {
    const data = await this.userService.getPermissionsByUserId(userId);
    return data;
  }

  @UseInterceptors(FileInterceptor('avatar', multerImageConfig))
  @UseGuards(JwtAuthGuard)
  @Patch('')
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUser: UpdateUserDto,
    @Auth() user: JwtPayload,
  ): Promise<any> {
    const data = await this.userService.edit(
      file,
      updateUser.id,
      updateUser,
      user,
    );
    return data;
  }
}
