
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { Test } from "src/entities";

@Injectable()
export class TestRepository extends BaseRepository<Test> {
  constructor(@InjectRepository(Test) private readonly testRepository: Repository<Test>) {
    super(testRepository);
  }
}
