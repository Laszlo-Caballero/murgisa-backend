import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/cliente/entities/ciudades.entity';
import { Repository } from 'typeorm';
import { Disponibilidad } from './entities/disponibilidad.entity';
import { Horario } from './entities/horario.entity';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Ciudad) private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Disponibilidad)
    private disponibilidadRepository: Repository<Disponibilidad>,
    @InjectRepository(Horario)
    private horarioRepository: Repository<Horario>,
  ) {}

  async getCiudades() {
    const ciudades = await this.ciudadRepository.find();
    return {
      message: 'Ciudades retrieved successfully',
      status: 200,
      data: ciudades,
    };
  }

  async getDisponibilidad() {
    const disponibilidades = await this.disponibilidadRepository.find();
    return {
      message: 'Disponibilidad retrieved successfully',
      status: 200,
      data: disponibilidades,
    };
  }
  async getHorarios() {
    const horarios = await this.horarioRepository.find();
    return {
      message: 'Horarios retrieved successfully',
      status: 200,
      data: horarios,
    };
  }
}
