import { Injectable } from '@nestjs/common';
import { CreateTipoMantenimientoDto } from './dto/create-tipo-mantenimiento.dto';
import { UpdateTipoMantenimientoDto } from './dto/update-tipo-mantenimiento.dto';
import { TipoMantenimiento } from './entities/tipo-mantenimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/home/entities/log.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';


@Injectable()
export class TipoMantenimientoService {
    constructor(
      @InjectRepository(TipoMantenimiento)
      private tipoMantenimientoRespository: Repository<TipoMantenimiento>,
      @InjectRepository(Log)
      private logRepository: Repository<Log>,
    ) {}
    
  async create(createTipoMantenimientoDto: CreateTipoMantenimientoDto) {
        const newTipo = this.tipoMantenimientoRespository.create(createTipoMantenimientoDto);

    await this.tipoMantenimientoRespository.save(newTipo);

    await this.logRepository.save({
      tipo: 'Tipo Mantenimiento',
      mensaje: `Nuevo Tipo de Mantenimiento ${newTipo.nombre} creado con exito`,
    });

    const tipos = await this.tipoMantenimientoRespository.find();

    return {
      message: 'Tipo de Mantenimiento created successfully',
      status: 201,
      data: tipos,
    };
  }

  async findAll() {
    const tipos = await this.tipoMantenimientoRespository.find();
    return {
      message: 'Tipos de mantenimiento created successfully',
      status: 200,
      data: tipos,
    };
  }

  async findOne(id: number) {
    const tipo = await this.tipoMantenimientoRespository.findOneBy({
      tipoMantenimientoId: id,
    });

    if (!tipo) {
      throw new HttpException(
        {
          message: `Tipo with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    return {
      message: 'Cargo retrieved successfully',
      status: 200,
      data: tipo,
    };
  }

  async update(id: number, updateTipoMantenimientoDto: UpdateTipoMantenimientoDto) {
    const tipo = await this.tipoMantenimientoRespository.findOneBy({
      tipoMantenimientoId: id,
    });
    if (!tipo) {
      throw new HttpException(
        {
          message: `Tipo de Mantenimiento with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }
    
    await this.tipoMantenimientoRespository.update(
      {
        tipoMantenimientoId: id,
      },
      {
        ...updateTipoMantenimientoDto,
      },
    );

    await this.logRepository.save({
      tipo: 'Tipo Mantenimiento',
      mensaje: `Tipo de Mantenimiento ${tipo.nombre} actualizado con exito`,
    });

    const tipos = await this.tipoMantenimientoRespository.find();

    return {
      message: `Tipo de Mantenimietno with id ${id} has been updated successfully`,
      status: 201,
      data: tipos,
    };
  }

  async remove(id: number) {
    const tipo = await this.tipoMantenimientoRespository.findOneBy({
      tipoMantenimientoId: id,
    });

    if (!tipo) {
      throw new HttpException(
        {
          message: `Tipo with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.tipoMantenimientoRespository.update(
      {
        tipoMantenimientoId: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Tipo de Mantenimiento',
      mensaje: `Tipo de Mantenimiento ${tipo.nombre} desactivado con exito`,
    });


    const tipos = await this.tipoMantenimientoRespository.find();

    return {
      message: `Tipo de mantenimiento with id ${id} has been  deactivated successfully`,
      status: 201,
      data: tipos,
    };
  }
}
