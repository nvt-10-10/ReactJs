
import { CategoryProduct } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';

@Injectable()
export class CategoryProductService  extends CrudService<CategoryProduct>{
  constructor(
    @InjectRepository(CategoryProduct) private readonly categoryproductRepository: Repository<CategoryProduct>,
  ) {
      super(categoryproductRepository);}
}
