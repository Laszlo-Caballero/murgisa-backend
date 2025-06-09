import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Ciudad } from './entities/ciudades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Ciudad])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
