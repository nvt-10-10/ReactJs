import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { Category, Role, User } from 'src/entities';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ProcessFile } from 'src/utils';
import { CacheService } from 'src/core/cache/cache.service';
import { findAllUsers } from 'src/database/query/user';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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
    let result: any;
    result = await this.cacheService.get(cache_key);
    if (!result) {
      result = await findAllUsers(
        this.userRepository,
        take,
        page,
        search,
        country,
        category,
        roleId,
        true,
      );
      this.cacheService.set(result, 60 * 60);
    }

    return result;
  }
  async edit(file: Express.Multer.File, code: string, data: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { code },
      relations: ['categories'],
    });
    if (!user) throw new BadRequestException('Người dùng không tồn tại');
    const role = await this.roleRepository.findOne({
      where: { id: data.roleId },
    });
    if (!role) throw new BadRequestException('Quyền không tồn tại');
    const { categories, ...dataUpadte } = data;
    const categoriesResult = await this.categoryRepository.find({
      where: {
        id: In(categories),
      },
    });
    if (dataUpadte.password) {
      dataUpadte.password = bcrypt.hashSync(dataUpadte.password, 10);
    }
    if (file && user.avatar) {
      ProcessFile.deleteOneFile(user.avatar);
    }
    user.categories = categoriesResult;
    const updatedUser = {
      ...user,
      ...dataUpadte,
      avatar: file ? '/uploads/avatars/' + file.filename : user.avatar,
      categories: categoriesResult,
    };
    return await this.userRepository.save(updatedUser);
  }
}
