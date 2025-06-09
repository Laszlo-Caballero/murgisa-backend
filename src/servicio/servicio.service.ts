import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  create(dto: CreateServicioDto) {
    const nuevo = this.servicioRepository.create(dto);
    return this.servicioRepository.save(nuevo);
  }

  findAll() {
    return this.servicioRepository.find();
  }

  findOne(id: number) {
    return this.servicioRepository.findOneBy({ idServicio: id });
  }

  update(id: number, dto: UpdateServicioDto) {
    return this.servicioRepository.update(id, dto);
  }

  remove(id: number) {
    return this.servicioRepository.delete(id);
  }
}
