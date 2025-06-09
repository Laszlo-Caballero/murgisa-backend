import { HttpException, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {
    constructor(
      @InjectRepository(Departamento)
      private departamentoRespository: Repository<Departamento>,
    ) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    const newDepartamento = this.departamentoRespository.create(createDepartamentoDto);

    return this.departamentoRespository.save(newDepartamento);
  }

  async findAll() {
    const departamentos = await this.departamentoRespository.find();
    return departamentos;
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });

    if (!departamento) {
      throw new HttpException(`Departamento with id ${id} not found`, 404);
    }

    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });
    if (!departamento) {
      throw new HttpException(`Departamento with id ${id} not found`, 404);
    }

    await this.departamentoRespository.update(
      {
        idDepartamento: id,
      },
      {
        ...updateDepartamentoDto,
      },
    );

    return {
      message: `Departamento with id ${id} has been updated successfully`,
      status: true,
    };
  }

  async remove(id: number) {
    const departamento = await this.departamentoRespository.findOneBy({
      idDepartamento: id,
    });

    if (!departamento) {
      throw new HttpException(`Departamento with id ${id} not found`, 404);
    }

    await this.departamentoRespository.update(
      {
        idDepartamento: id,
      },
      {
        estado: false,
      },
    );

    return {
      message: `Departamento with id ${id} has been deactivated successfully`,
      status: true,
    };
  }
}
