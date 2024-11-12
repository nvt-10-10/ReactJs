import { Repository } from 'typeorm';
import { Category } from 'src/entities';
import { FindCommonOptions } from '../../interface';
import { findCommon } from '../../common';

export const findAll = async (
  categoryRepository: Repository<Category>,
  take?: number,
  page?: number,
  status?: boolean,
  isGetLength: boolean = false,
): Promise<any[] | [any[], number]> => {
  const options: FindCommonOptions = {
    take,
    page,
    isGetLength,
    filters: [{ field: 'category.status', operator: '=', value: status }],
    joins: [],
    orWhere: [],
    orderBy: { field: 'category.name', direction: 'ASC' },
    selects: [],
  };
  const CategorySelect = ['id', 'slug', 'code', 'name', 'image'];
  options.selects = CategorySelect.map((item) => ({
    alias: 'category',
    field: item,
  }));
  return await findCommon(
    { entity: new Category(), alias: 'category' },
    categoryRepository,
    options,
  );
};
