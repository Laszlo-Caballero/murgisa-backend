import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Log } from 'src/home/entities/log.entity';
import { TipoServicio } from 'src/tipo-servicio/entities/tipoServicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Log, TipoServicio])],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
