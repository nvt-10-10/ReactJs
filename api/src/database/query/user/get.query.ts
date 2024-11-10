import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { FindCommonOptions } from '../interface';
import { findCommon } from '../common';

export const findAllUsers = async (
  userRepository: Repository<User>,
  take: number = 10,
  page: number = 1,
  search?: string,
  country?: number,
  categoryId?: string,
  roleId: number = 2,
  isGetLength: boolean = false,
): Promise<any[] | [any[], number]> => {
  const options: FindCommonOptions = {
    take,
    page,
    isGetLength,
    filters: [
      { field: 'user.status', operator: '=', value: true },
      { field: 'user.roleId', operator: '=', value: roleId },
    ],
    joins: [],
    orWhere: [],
    orderBy: { field: 'user.name', direction: 'ASC' },
    selects: [],
  };

  if (categoryId && categoryId !== 'all') {
    options.joins.push({
      table: 'categories',
      alias: 'category',
      type: 'inner',
      condition:
        'category.id = user_category.categoryId AND category.userId = user.id',
    });

    options.filters.push({
      field: 'category.id',
      operator: '=',
      value: categoryId,
    });
  }

  if (country) {
    options.filters.push({
      field: 'user.country',
      operator: '=',
      value: country,
    });
  }

  if (search) {
    options.filters.push({
      field: 'user.name',
      operator: '=',
      value: search,
    });
  }

  const userSelect: any[] = [
    'id',
    'code',
    'slug',
    'name',
    'status',
    'description',
  ];

  options.selects = userSelect.map((item) => ({ alias: 'user', field: item }));

  return findCommon(
    { entity: new User(), alias: 'user' },
    userRepository,
    options,
  );
};
