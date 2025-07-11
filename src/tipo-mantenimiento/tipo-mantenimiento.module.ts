import { Module } from '@nestjs/common';
import { TipoMantenimientoService } from './tipo-mantenimiento.service';
import { TipoMantenimientoController } from './tipo-mantenimiento.controller';

@Module({
  controllers: [TipoMantenimientoController],
  providers: [TipoMantenimientoService],
})
export class TipoMantenimientoModule {}
