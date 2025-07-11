import { Module } from '@nestjs/common';
import { TipoRecursoService } from './tipo-recurso.service';
import { TipoRecursoController } from './tipo-recurso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoRecurso } from './entities/tipo-recurso.entity';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoRecurso, Log])],
  controllers: [TipoRecursoController],
  providers: [TipoRecursoService],
})
export class TipoRecursoModule {}
