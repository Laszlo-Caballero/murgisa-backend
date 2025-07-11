import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}
  async create(createProveedorDto: CreateProveedorDto) {
    const newProveedor = this.proveedorRepository.create(createProveedorDto);
    await this.proveedorRepository.save(newProveedor);
    await this.logRepository.save({
      tipo: 'Proveedor',
      mensaje: `Nuevo Proveedor ${newProveedor.nombreResponsable} creado con exito`,
    });
    const proveedores = await this.proveedorRepository.find();
    return {
      message: 'Proveedor created successfully',
      status: 201,
      data: proveedores,
    };
  }

  async findAll() {
    const proveedores = await this.proveedorRepository.find();
    return {
      message: 'Proveedor created successfully',
      status: 201,
      data: proveedores,
    };
  }

  async findOne(id: number) {
    const proveedor = await this.proveedorRepository.findOneBy({
      idProovedor: id,
    });

    if (!proveedor) {
      throw new HttpException(
        {
          message: `Proveedor with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    return {
      message: 'Proveedor retrieved successfully',
      status: 200,
      data: proveedor,
    };
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    const proveedor = await this.proveedorRepository.findOneBy({
      idProovedor: id,
    });
    if (!proveedor) {
      throw new HttpException(
        {
          message: `Proveedor with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }
    await this.proveedorRepository.update(
      {
        idProovedor: id,
      },
      {
        ...updateProveedorDto,
      },
    );
    await this.logRepository.save({
      tipo: 'Proveedor',
      mensaje: `Proveedor ${proveedor.nombreResponsable} actualizada con exito`,
    });

    const proveedores = await this.proveedorRepository.find();

    return {
      message: `Proveedor with id ${id} has been updated successfully`,
      status: 201,
      data: proveedores,
    };
  }

  async remove(id: number) {
    const proveedor = await this.proveedorRepository.findOneBy({
      idProovedor: id,
    });

    if (!proveedor) {
      throw new HttpException(
        {
          message: `Proveedor with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }
    await this.proveedorRepository.update(
      {
        idProovedor: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Proveedor',
      mensaje: `Proveedor ${proveedor.nombreResponsable} desactivado con exito`,
    });

    const proveedores = await this.proveedorRepository.find();

    return {
      message: `Proveedor with id ${id} has been deactivated successfully`,
      status: 200,
      data: proveedores,
    };
  }
}
