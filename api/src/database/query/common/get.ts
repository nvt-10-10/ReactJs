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

  const query = repository.createQueryBuilder(
    entity ? entity.alias : 'default_alias',
  );

  if (selects.length > 0) {
    console.log({
      selects,
    });
    query.select([]);
    selects.forEach(({ alias, field }) => {
      query.addSelect(`${alias}.${field}`);
    });
  } else {
    query.addSelect(`${entity.alias}`);
  }

  joins.forEach((join) => {
    const {
      table,
      alias,
      type = 'left',
      condition,
      joinTable,
      joinTableAlias,
    } = join;

    if (type === 'many-to-many' && joinTable && joinTableAlias) {
      query.leftJoin(
        joinTable,
        joinTableAlias,
        `${entity.alias}.id = ${joinTableAlias}.${entity.alias}Id`,
      );

      const targetJoinCondition =
        condition || `${joinTableAlias}.${table}Id = ${alias}.id`;

      query.leftJoinAndSelect(table, alias, targetJoinCondition);
    } else {
      const joinQuery = `${entity.alias}.${table}`;
      if (type === 'inner') {
        query.innerJoinAndSelect(joinQuery, alias, condition);
      } else if (type === 'left') {
        query.leftJoinAndSelect(joinQuery, alias, condition);
      }
    }
  });
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

  if (orderBy) {
    query.orderBy(`${orderBy.field}`, orderBy.direction);
  }

  if (take > 0) query.take(take);
  if (page > 0) query.skip((page - 1) * take);

  if (isGetLength) {
    return await query.getManyAndCount();
  }
  return await query.getMany();
};
