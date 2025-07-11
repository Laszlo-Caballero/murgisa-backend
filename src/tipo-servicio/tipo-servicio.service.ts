import { Injectable } from '@nestjs/common';
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoServicio } from './entities/tipoServicio.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class TipoServicioService {
  constructor(
    @InjectRepository(TipoServicio)
    private tipoServicioRepository: Repository<TipoServicio>,
    @InjectRepository(Log) private logRepository: Repository<Log>,
  ) {}

  async create(createTipoServicioDto: CreateTipoServicioDto) {
    const newTipoServicio = this.tipoServicioRepository.create(
      createTipoServicioDto,
    );
    await this.tipoServicioRepository.save(newTipoServicio);
    const logEntry = this.logRepository.create({
      tipo: 'Tipo de Servicio',
      mensaje: `Nuevo tipo de servicio creado: ${newTipoServicio.nombre}`,
    });

    await this.logRepository.save(logEntry);

    const tipos = await this.tipoServicioRepository.find();

    return {
      message: 'Tipo de servicio created successfully',
      status: 201,
      data: tipos,
    };
  }

  async findAll() {
    const tipos = await this.tipoServicioRepository.find();
    return {
      message: 'Tipos de servicio retrieved successfully',
      status: 200,
      data: tipos,
    };
  }

  async findOne(id: number) {
    const tipo = await this.tipoServicioRepository.findOne({
      where: { idTipoServicio: id },
    });
    if (!tipo) {
      return {
        message: 'Tipo de servicio not found',
        status: 404,
      };
    }
    return {
      message: 'Tipo de servicio retrieved successfully',
      status: 200,
      data: tipo,
    };
  }

  async update(id: number, updateTipoServicioDto: UpdateTipoServicioDto) {
    const tipo = await this.tipoServicioRepository.findOne({
      where: { idTipoServicio: id },
    });
    if (!tipo) {
      return {
        message: 'Tipo de servicio not found',
        status: 404,
      };
    }
    await this.tipoServicioRepository.update(id, updateTipoServicioDto);

    const logEntry = this.logRepository.create({
      tipo: 'Tipo de Servicio',
      mensaje: `Tipo de servicio actualizado: ${tipo.nombre}`,
    });

    await this.logRepository.save(logEntry);
    const tipos = await this.tipoServicioRepository.find();
    return {
      message: 'Tipo de servicio updated successfully',
      status: 200,
      data: tipos,
    };
  }

  async remove(id: number) {
    const tipo = await this.tipoServicioRepository.findOne({
      where: { idTipoServicio: id },
    });
    if (!tipo) {
      return {
        message: 'Tipo de servicio not found',
        status: 404,
      };
    }
    await this.tipoServicioRepository.update(id, { estado: false });
    const logEntry = this.logRepository.create({
      tipo: 'Tipo de Servicio',
      mensaje: `Tipo de servicio eliminado: ${tipo.nombre}`,
    });
    await this.logRepository.save(logEntry);

    const tipos = await this.tipoServicioRepository.find();

    return {
      message: 'Tipo de servicio removed successfully',
      status: 200,
      data: tipos,
    };
  }
}
