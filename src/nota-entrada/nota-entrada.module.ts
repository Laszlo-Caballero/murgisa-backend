import { Module } from '@nestjs/common';
import { NotaEntradaService } from './nota-entrada.service';
import { NotaEntradaController } from './nota-entrada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaEntrada } from './entities/nota-entrada.entity';
import { Log } from 'src/home/entities/log.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntrada, Log, Recurso, Proveedor])],
  controllers: [NotaEntradaController],
  providers: [NotaEntradaService],
})
export class NotaEntradaModule {}
