import { Module } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { RecursoController } from './recurso.controller';

@Module({
  controllers: [RecursoController],
  providers: [RecursoService],
})
export class RecursoModule {}
