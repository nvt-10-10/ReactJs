import { Like, Repository } from 'typeorm';
import { BaseEntity } from './entities/base.entity';
import { IPagination } from 'src/interfaces';
import { Paginate } from 'src/utils';

export abstract class CrudService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: any): Promise<T> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(data: any): Promise<T[]> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }

  async deleteMany(ids: number[]): Promise<any> {
    return await this.repository.delete(ids);
  }

  async filter(paginationParams: IPagination): Promise<any> {
    const { page, size, sort } = paginationParams;
    const take = size; // Số bản ghi được lấy
    const skip = (page - 1) * size; // Số bản ghi bị bỏ qua
    const order: any = { createdAt: sort === 'ASC' ? 'ASC' : 'DESC' };
    const [rows, total] = await this.repository.findAndCount({
      order,
      skip,
      take,
    });
    return new Paginate(rows, total, page, size);
  }

  async filterSearchItem(
    paginationParams: IPagination,
    columns: string[],
  ): Promise<any> {
    const { page, size, sort, search } = paginationParams;
    console.log(columns, search);
    const take = size; // Số bản ghi được lấy
    const skip = (page - 1) * size; // Số bản ghi bị bỏ qua
    const order: any = { createdAt: sort === 'ASC' ? 'ASC' : 'DESC' };
    let where: any = {};
    if (search) {
      where = columns.map((column) => ({
        [column]: Like(`%${search}%`),
      }));
    }
    const [rows, total] = await this.repository.findAndCount({
      order,
      skip,
      take,
      where,
    });
    return new Paginate(rows, total, page, size);
  }
}
