import { Module } from '@nestjs/common';
import { MantenimientoCorrectivoService } from './mantenimiento-correctivo.service';
import { MantenimientoCorrectivoController } from './mantenimiento-correctivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantenimientoCorrectivo } from './entities/mantenimiento-correctivo.entity';
import { TipoMantenimiento } from 'src/tipo-mantenimiento/entities/tipo-mantenimiento.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MantenimientoCorrectivo,
      Personal,
      Recurso,
      TipoMantenimiento,
      Log,
    ]),
  ],
  controllers: [MantenimientoCorrectivoController],
  providers: [MantenimientoCorrectivoService],
})
export class MantenimientoCorrectivoModule {}
