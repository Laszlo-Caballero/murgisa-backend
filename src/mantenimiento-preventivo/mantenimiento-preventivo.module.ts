import { Module } from '@nestjs/common';
import { MantenimientoPreventivoService } from './mantenimiento-preventivo.service';
import { MantenimientoPreventivoController } from './mantenimiento-preventivo.controller';

@Module({
  controllers: [MantenimientoPreventivoController],
  providers: [MantenimientoPreventivoService],
})
export class MantenimientoPreventivoModule {}
