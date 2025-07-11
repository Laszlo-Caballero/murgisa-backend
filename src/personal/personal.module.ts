import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Profesion } from 'src/profesion/entities/profesion.entity';
import { Cargo } from 'src/cargo/entities/cargo.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Log } from 'src/home/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personal, Cargo, Profesion, Departamento, Log]),
  ],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule {}
