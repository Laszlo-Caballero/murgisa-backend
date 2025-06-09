import { Module } from '@nestjs/common';
import { ProfesionService } from './profesion.service';
import { ProfesionController } from './profesion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesion } from './entities/profesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesion])],
  controllers: [ProfesionController],
  providers: [ProfesionService],
})
export class ProfesionModule {}
