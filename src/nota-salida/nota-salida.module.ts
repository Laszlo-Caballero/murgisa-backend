import { Module } from '@nestjs/common';
import { NotaSalidaService } from './nota-salida.service';
import { NotaSalidaController } from './nota-salida.controller';

@Module({
  controllers: [NotaSalidaController],
  providers: [NotaSalidaService],
})
export class NotaSalidaModule {}
