import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/cliente/entities/ciudades.entity';
import { Disponibilidad } from './entities/disponibilidad.entity';
import { Horario } from './entities/horario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Disponibilidad, Horario])],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
