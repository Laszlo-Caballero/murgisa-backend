import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Log } from 'src/home/entities/log.entity';
import { TipoServicio } from 'src/tipo-servicio/entities/tipoServicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(TipoServicio)
    private tipoServicioRepository: Repository<TipoServicio>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(dto: CreateServicioDto) {
    const tipoServicio = await this.tipoServicioRepository.findOne({
      where: { idTipoServicio: dto.tipoServicioId },
    });

    if (!tipoServicio) {
      throw new HttpException(
        {
          message: 'Tipo de servicio not found',
          status: 404,
        },
        404,
      );
    }

    const nuevo = this.servicioRepository.create({
      ...dto,
      tipoServicio,
    });
    await this.servicioRepository.save(nuevo);

    await this.logRepository.save({
      tipo: 'Servicio',
      mensaje: `Nuevo servicio creado: ${nuevo.nombre}`,
    });

    const servicios = await this.servicioRepository.find({
      relations: ['tipoServicio'],
    });

    return {
      message: 'Servicio created successfully',
      status: 201,
      data: servicios,
    };
  }

  async findAll() {
    const servicios = await this.servicioRepository.find({
      relations: ['tipoServicio'],
    });

    return {
      message: 'Servicios retrieved successfully',
      status: 200,
      data: servicios,
    };
  }

  async findOne(id: number) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio: id },
      relations: ['tipoServicio'],
    });

    if (!servicio) {
      throw new HttpException(
        {
          message: 'Servicio not found',
          status: 404,
        },
        404,
      );
    }

    return {
      message: 'Servicio retrieved successfully',
      status: 200,
      data: servicio,
    };
  }

  async update(id: number, dto: UpdateServicioDto) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio: id },
    });
    if (!servicio) {
      throw new HttpException(
        {
          message: 'Servicio not found',
          status: 404,
        },
        404,
      );
    }

    const tipoServicio = await this.tipoServicioRepository.findOne({
      where: { idTipoServicio: dto.tipoServicioId },
    });

    if (!tipoServicio) {
      throw new HttpException(
        {
          message: 'Tipo de servicio not found',
          status: 404,
        },
        404,
      );
    }
    await this.servicioRepository.update(id, {
      ...dto,
      tipoServicio,
    });

    await this.logRepository.save({
      tipo: 'Servicio',
      mensaje: `Servicio actualizado: ${servicio.nombre}`,
    });

    const servicios = await this.servicioRepository.find({
      relations: ['tipoServicio'],
    });

    return {
      message: 'Servicio updated successfully',
      status: 200,
      data: servicios,
    };
  }

  async remove(id: number) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio: id },
    });

    if (!servicio) {
      throw new HttpException(
        {
          message: 'Servicio not found',
          status: 404,
        },
        404,
      );
    }
    await this.servicioRepository.update(id, { estado: false });

    await this.logRepository.save({
      tipo: 'Servicio',
      mensaje: `Servicio Desactivado: ${servicio.nombre}`,
    });
    const servicios = await this.servicioRepository.find({
      relations: ['tipoServicio'],
    });
    return {
      message: 'Servicio deleted successfully',
      status: 200,
      data: servicios,
    };
  }
}
