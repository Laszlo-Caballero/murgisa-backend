import { Module } from '@nestjs/common';
import { TipoServicioService } from './tipo-servicio.service';
import { TipoServicioController } from './tipo-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoServicio } from './entities/tipoServicio.entity';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoServicio, Log])],
  controllers: [TipoServicioController],
  providers: [TipoServicioService],
})
export class TipoServicioModule {}
