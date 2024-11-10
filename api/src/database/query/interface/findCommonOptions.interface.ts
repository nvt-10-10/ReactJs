import { FindOptionsWhere } from 'typeorm';
import { JoinOption } from './joinOption.interface';
import { Filter } from './filter.interface';
import { Select } from './select.interface';
import { OrderBy } from './orderBy.interface';

export interface FindCommonOptions {
  take?: number;
  page?: number;
  filters?: Filter[]; // Đối với QueryBuilder
  where?: FindOptionsWhere<any>; // Đối với find và findAndCount
  orWhere?: Filter[]; // Các điều kiện OR động
  orderBy?: OrderBy;
  isGetLength?: boolean;
  joins?: JoinOption[];
  selects?: Select[];
}
