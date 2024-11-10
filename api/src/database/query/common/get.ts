import { Repository } from 'typeorm';
import { FindCommonOptions } from '../interface';

export const findCommon = async (
  entity: { entity: any; alias: string },
  repository: Repository<any>,
  options: FindCommonOptions = {},
): Promise<any[] | [any[], number]> => {
  const {
    take = 10,
    page = 1,
    filters = [],
    orWhere = [],
    orderBy,
    isGetLength = false,
    joins = [],
    selects = [],
  } = options;

  // Điều kiện: Sử dụng QueryBuilder khi có joins hoặc filters động, nếu không thì sử dụng find/findAndCount
  const query = repository.createQueryBuilder(
    entity ? entity.alias : 'default_alias',
  );

  // Thêm các cột cần select với alias
  if (selects.length > 0) {
    selects.forEach(({ alias, field }) => {
      query.addSelect(`${alias}.${field}`);
    });
  } else {
    query.addSelect(`${entity.alias}`);
  }

  // Thêm các join động
  joins.forEach((join) => {
    const { table, alias, type = 'left', condition } = join;
    const joinQuery = `${entity.alias}.${table}`;
    if (type === 'inner') {
      query.innerJoinAndSelect(joinQuery, alias, condition);
    } else if (type === 'left') {
      query.leftJoinAndSelect(joinQuery, alias, condition);
    }
  });

  // Thêm điều kiện WHERE động từ filters
  filters.forEach(({ field, operator, value }) => {
    const paramKey = `${field}`;
    if (operator === 'IN' && Array.isArray(value)) {
      query.andWhere(`${field} IN (:...${paramKey})`, {
        [paramKey]: value,
      });
    } else if (operator === 'LIKE') {
      query.andWhere(`${field} LIKE :${paramKey}`, {
        [paramKey]: `%${value}%`,
      });
    } else {
      query.andWhere(`${field} ${operator} :${paramKey}`, {
        [paramKey]: value,
      });
    }
  });

  // Thêm điều kiện OR WHERE động
  orWhere.forEach((filter, index) => {
    const { field, operator, value } = filter;
    const paramKey = `${field}_${index}`;
    if (operator === 'IN' && Array.isArray(value)) {
      query.orWhere(`${field} IN (:...${paramKey})`, {
        [paramKey]: value,
      });
    } else if (operator === 'LIKE') {
      query.orWhere(`${field} LIKE :${paramKey}`, {
        [paramKey]: `%${value}%`,
      });
    } else {
      query.orWhere(`${field} ${operator} :${paramKey}`, {
        [paramKey]: value,
      });
    }
  });

  // Sắp xếp
  if (orderBy) {
    query.orderBy(`${orderBy.field}`, orderBy.direction);
  }

  // Phân trang
  query.take(take);
  query.skip((page - 1) * take);

  // Trả về kết quả với tổng số bản ghi nếu cần
  if (isGetLength) {
    return await query.getManyAndCount();
  }

  return await query.getMany();
};
