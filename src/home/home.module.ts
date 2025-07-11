import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Venta } from 'src/venta/entities/venta.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { MantenimientoPreventivo } from 'src/mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Log,
      Venta,
      MantenimientoPreventivo,
      Personal,
      Servicio,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
