import { HttpException, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class DepartamentoService {
    constructor(
      @InjectRepository(Departamento)
      private departamentoRespository: Repository<Departamento>,
      @InjectRepository(Log)
      private logRepository: Repository<Log>,
    ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const newDepartamento = this.departamentoRespository.create(createDepartamentoDto);

    await this.departamentoRespository.save(newDepartamento);

    await this.logRepository.save({
      tipo: 'Departamento',
      mensaje: `Nuevo Departamento ${newDepartamento.titulo} creado con exito`,
    });

    const departamentos = await this.departamentoRespository.find();

    return {
      message: 'Departamento created successfully',
      status: 201,
      data: departamentos,
    };
  }


  async findAll() {
    const departamentos = await this.departamentoRespository.find();
    return {
      message: 'Recurso created successfully',
      status: 200,
      data: departamentos,
    };
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });

    if (!departamento) {
      throw new HttpException(
        {
          message: `Departamento with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

        return {
      message: 'Profesion retrieved successfully',
      status: 200,
      data: departamento,
    };
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });
    if (!departamento) {
      throw new HttpException(
        {
          message: `Departamento with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.departamentoRespository.update(
      {
        idDepartamento: id,
      },
      {
        ...updateDepartamentoDto,
      },
    );

    await this.logRepository.save({
      tipo: 'Departamento',
      mensaje: `Departamento ${departamento.titulo} actualizada con exito`,
    });

    const departamentos = await this.departamentoRespository.find();

    return {
      message: `Departamento with id ${id} has been updated successfully`,
      status: 201,
      data: departamentos,
    };
  }

  async remove(id: number) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });

    if (!departamento) {
      throw new HttpException(
        {
          message: `Departamento with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.departamentoRespository.update(
      {
        idDepartamento: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Departamento',
      mensaje: `Departamento ${departamento.titulo} desactivada con exito`,
    });

    const departamentos = await this.departamentoRespository.find();

    return {
      message: `Departamento with id ${id} has been deactivated successfully`,
      status: 200,
      data: departamentos,
    };
  }
}
