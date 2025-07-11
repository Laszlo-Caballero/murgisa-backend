import { Module } from '@nestjs/common';
import { TipoMantenimientoService } from './tipo-mantenimiento.service';
import { TipoMantenimientoController } from './tipo-mantenimiento.controller';
import { Log } from 'src/home/entities/log.entity';
import { TipoMantenimiento } from './entities/tipo-mantenimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([TipoMantenimiento, Log])],
  controllers: [TipoMantenimientoController],
  providers: [TipoMantenimientoService],
})
export class TipoMantenimientoModule {}
