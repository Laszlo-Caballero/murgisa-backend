import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo, Auth, Log])],
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {}
