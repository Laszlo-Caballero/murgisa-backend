import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { Proveedor } from './entities/proveedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Log])],
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
