
import { New } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';

@Injectable()
export class NewService  extends CrudService<New>{
  constructor(
    @InjectRepository(New) private readonly newRepository: Repository<New>,
  ) {
      super(newRepository);}
}
