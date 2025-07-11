import { Module } from '@nestjs/common';
import { MantenimientoPreventivoService } from './mantenimiento-preventivo.service';
import { MantenimientoPreventivoController } from './mantenimiento-preventivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantenimientoPreventivo } from './entities/mantenimiento-preventivo.entity';
import { TipoMantenimiento } from 'src/tipo-mantenimiento/entities/tipo-mantenimiento.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Horario } from 'src/utils/entities/horario.entity';
import { Log } from 'src/home/entities/log.entity';
@Module({
  imports: [
      TypeOrmModule.forFeature([
        MantenimientoPreventivo,
        Personal,
        Recurso,
        Horario,
        TipoMantenimiento,
        Log,
      ]),
    ],
  controllers: [MantenimientoPreventivoController],
  providers: [MantenimientoPreventivoService],
})
export class MantenimientoPreventivoModule {}
