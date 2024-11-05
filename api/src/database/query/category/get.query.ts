import { Repository } from 'typeorm';
import { Category } from 'src/entities';

export const findAll = async (
  categoryRepository: Repository<Category>,
  take?: number,
  skip?: number,
  status?: boolean,
  isGetLength: boolean = false,
  select?: (keyof Category)[],
): Promise<any[] | [any[], number]> => {
  const query = categoryRepository.createQueryBuilder('category');
  if (status !== undefined) {
    query.where('category.status = :status', { status });
  }

  if (select && select.length > 0) {
    query.select(select.map((column) => `category.${String(column)}`));
  }

  if (take !== undefined) {
    query.take(take);
  }
  if (skip !== undefined) {
    query.skip(skip);
  }
  if (isGetLength) {
    return await query.getManyAndCount();
  }
  return await query.getMany();
};
