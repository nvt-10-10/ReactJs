
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { Quote } from "src/entities";

@Injectable()
export class QuoteRepository extends BaseRepository<Quote> {
  constructor(@InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>) {
    super(quoteRepository);
  }
}
