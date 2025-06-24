import { Module } from '@nestjs/common';
import { TipoRecursoService } from './tipo-recurso.service';
import { TipoRecursoController } from './tipo-recurso.controller';

@Module({
  controllers: [TipoRecursoController],
  providers: [TipoRecursoService],
})
export class TipoRecursoModule {}
