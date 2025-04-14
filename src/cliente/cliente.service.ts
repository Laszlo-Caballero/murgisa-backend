import { HttpException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    return 'This action adds a new cliente';
  }

  async findAll() {
    const clientes = await this.clienteRepository.find();

    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ idCliente: id });

    if (!cliente) {
      throw new HttpException('Cliente no encotrado', 404);
    }

    return cliente;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
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
