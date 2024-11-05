
import { Test } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';

@Injectable()
export class TestService  extends CrudService<Test>{
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {
      super(testRepository);}
}
