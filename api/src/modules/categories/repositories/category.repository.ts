
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { Category } from "src/entities";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
    super(categoryRepository);
  }
}
