import { Module } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { RecursoController } from './recurso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disponibilidad } from 'src/utils/entities/disponibilidad.entity';
import { TipoRecurso } from 'src/tipo-recurso/entities/tipo-recurso.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { Recurso } from './entities/recurso.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([Recurso, Disponibilidad, TipoRecurso, Proveedor]),
    ],
  controllers: [RecursoController],
  providers: [RecursoService],
})
export class RecursoModule {}
