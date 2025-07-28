import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from 'src/cliente/entities/ciudades.entity';
import { Repository } from 'typeorm';
import { Disponibilidad } from './entities/disponibilidad.entity';
import { Horario } from './entities/horario.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Ciudad) private ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Disponibilidad)
    private disponibilidadRepository: Repository<Disponibilidad>,
    @InjectRepository(Horario)
    private horarioRepository: Repository<Horario>,
    private redisService: RedisService,
  ) {}

  async getCiudades() {
    const key = 'ciudades_all';

    const cachedCiudades = await this.redisService.get<Ciudad[]>(key);
    if (cachedCiudades) {
      return {
        message: 'Ciudades retrieved from cache',
        status: 200,
        data: cachedCiudades,
      };
    }

    const ciudades = await this.ciudadRepository.find();
    await this.redisService.set(key, ciudades);
    return {
      message: 'Ciudades retrieved successfully',
      status: 200,
      data: ciudades,
    };
  }

  async getDisponibilidad() {
    const key = 'disponibilidad_all';

    const cachedDisponibilidad =
      await this.redisService.get<Disponibilidad[]>(key);
    if (cachedDisponibilidad) {
      return {
        message: 'Disponibilidad retrieved from cache',
        status: 200,
        data: cachedDisponibilidad,
      };
    }

    const disponibilidades = await this.disponibilidadRepository.find();

    await this.redisService.set(key, disponibilidades);

    return {
      message: 'Disponibilidad retrieved successfully',
      status: 200,
      data: disponibilidades,
    };
  }
  async getHorarios() {
    const key = 'horarios_all';

    const cachedHorarios = await this.redisService.get<Horario[]>(key);
    if (cachedHorarios) {
      return {
        message: 'Horarios retrieved from cache',
        status: 200,
        data: cachedHorarios,
      };
    }

    const horarios = await this.horarioRepository.find();

    await this.redisService.set(key, horarios);

    return {
      message: 'Horarios retrieved successfully',
      status: 200,
      data: horarios,
    };
  }
}
