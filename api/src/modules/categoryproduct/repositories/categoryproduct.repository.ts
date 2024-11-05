
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { CategoryProduct } from "src/entities";

@Injectable()
export class CategoryProductRepository extends BaseRepository<CategoryProduct> {
  constructor(@InjectRepository(CategoryProduct) private readonly categoryproductRepository: Repository<CategoryProduct>) {
    super(categoryproductRepository);
  }
}
