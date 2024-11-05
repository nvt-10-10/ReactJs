
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { New } from "src/entities";

@Injectable()
export class NewRepository extends BaseRepository<New> {
  constructor(@InjectRepository(New) private readonly newRepository: Repository<New>) {
    super(newRepository);
  }
}
