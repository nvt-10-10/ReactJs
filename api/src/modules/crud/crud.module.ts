import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';

@Module({
  providers: [CrudService as any],
  exports: [CrudService],
})
export class CrudModule {}
