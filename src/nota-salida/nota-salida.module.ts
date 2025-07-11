import { Module } from '@nestjs/common';
import { NotaSalidaService } from './nota-salida.service';
import { NotaSalidaController } from './nota-salida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaSalida } from './entities/nota-salida.entity';
import { Log } from 'src/home/entities/log.entity';
import { Venta } from 'src/venta/entities/venta.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotaSalida, Log, Venta, Recurso])],
  controllers: [NotaSalidaController],
  providers: [NotaSalidaService],
})
export class NotaSalidaModule {}
