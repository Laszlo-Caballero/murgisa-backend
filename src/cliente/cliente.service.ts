import { HttpException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudades.entity';
import { parse } from 'date-fns';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Ciudad) private ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const ciudad = await this.ciudadRepository.findOneBy({
      idCiudad: createClienteDto.ciudadId,
    });

    if (!ciudad) {
      throw new HttpException('Ciudad no encontrada', 404);
    }

    const parseDate = parse(
      createClienteDto.fechaNacimiento,
      'yyyy-MM-dd',
      new Date(),
    );

    const newCliente = this.clienteRepository.create({
      ciudad,
      ...createClienteDto,
      fechaNacimiento: parseDate,
    });
    return this.clienteRepository.save(newCliente);
  }

  async findAll() {
    const clientes = await this.clienteRepository.find({
      relations: ['ciudad'],
    });

    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
      relations: ['ciudad'],
    });

    if (!cliente) {
      throw new HttpException('Cliente no encotrado', 404);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const findCliente = await this.clienteRepository.findOneBy({
      idCliente: id,
    });

    if (!findCliente) {
      throw new HttpException('Cliente no encontrado', 404);
    }
    const { ciudadId, ...rest } = updateClienteDto;

    const ciudad = await this.ciudadRepository.findOneBy({
      idCiudad: ciudadId,
    });

    if (!ciudad) {
      throw new HttpException('Ciudad no encontrada', 404);
    }

    await this.clienteRepository.update(
      { idCliente: id },
      {
        ...rest,
        ciudad,
      },
    );

    return {
      message: `Se actualizo el cliente con id ${id}`,
      status: true,
    };
  }

  async remove(id: number) {
    const findCliente = await this.clienteRepository.findOneBy({
      idCliente: id,
    });

    if (!findCliente) {
      throw new HttpException('Cliente no encontrado', 404);
    }

    await this.clienteRepository.delete({ idCliente: id });

    return `se elimino el cliente con id ${id}`;
  }
}
