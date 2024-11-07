import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { User } from 'src/entities';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ProcessFile } from 'src/utils';
import { CacheService } from 'src/core/cache/cache.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cacheService: CacheService,
  ) {
    super(userRepository);
  }
  async getPermissionsByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'role',
        'role.rolePermissions',
        'role.rolePermissions.permission',
      ],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const permissions = user.role.rolePermissions.map(
      (rolePermission) => rolePermission.permission,
    );

    return permissions;
  }

  async findAll(
    take: number = 10,
    page: number = 1,
    search?: string,
    country?: number,
    category?: string,
    cache_key: string = 'usersAll',
    roleId: number = 2,
  ): Promise<any> {
    // let result = await this.cacheService.get(cache_key);
    let result;
    if (!result) {
      const whereConditions: any = {
        status: true,
        role: {
          id: roleId || undefined,
        },
      };

      if (search) {
        whereConditions.name = Like(`%${search}%`);
      }

      if (country) {
        whereConditions.country = country;

        if (category) {
          whereConditions.category = category;
        }
      }

      console.log({ whereConditions });

      result = await this.userRepository.findAndCount({
        take,
        skip: (page - 1) * take,
        where: whereConditions,
      });
      await this.cacheService.set(cache_key, result);
      return result;
    }
  }

  async edit(
    file: Express.Multer.File,
    id: number,
    data: UpdateUserDto,
    userPayload: JwtPayload,
  ) {
    if (!(id == userPayload.id || userPayload.role == 'Admin')) {
      throw new BadRequestException('Bạn không có quyền này');
    }
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new BadGatewayException('User không tồn tại');
    if (data.password) data.password = bcrypt.hashSync(data.password, 10);

    if (file) ProcessFile.deleteOneFile(user.avatar);

    return await this.update(id, {
      ...data,
      avatar: file ? '/uploads/avatars/' + file.filename : user.avatar,
    });
  }
}
