import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Log } from 'src/home/entities/log.entity';
import { AsignacionPersonal } from 'src/personal/entities/asignacionPersonal.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Ciudad } from 'src/cliente/entities/ciudades.entity';
import { PagoServicio } from './entities/pagoServicio.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { DetalleVenta } from './entities/detalleVenta.entity';
import { FormaPago } from 'src/forma-pago/entities/forma-pago.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
      Log,
      AsignacionPersonal,
      Cliente,
      Servicio,
      Personal,
      Ciudad,
      PagoServicio,
      Recurso,
      DetalleVenta,
      FormaPago,
    ]),
    RedisModule,
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
