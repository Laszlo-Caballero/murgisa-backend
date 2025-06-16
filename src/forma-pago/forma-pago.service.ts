import { HttpException, Injectable } from '@nestjs/common';
import { CreateFormaPagoDto } from './dto/create-forma-pago.dto';
import { UpdateFormaPagoDto } from './dto/update-forma-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaPago } from './entities/forma-pago.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class FormaPagoService {
  constructor(
    @InjectRepository(FormaPago)
    private formaPagoRepository: Repository<FormaPago>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  create(createFormaPagoDto: CreateFormaPagoDto) {
    const newFormaPago = this.formaPagoRepository.create(createFormaPagoDto);
    this.logRepository.save({
      tipo: 'Forma de Pago',
      mensaje: `Se ha creado la forma de pago ${newFormaPago.tipo}`,
    });
    return this.formaPagoRepository.save(newFormaPago);
  }

  findAll() {
    return this.formaPagoRepository.find();
  }

  async findOne(id: number) {
    const formaPago = await this.formaPagoRepository.findOne({
      where: { idFormaPago: id },
    });

    if (!formaPago) {
      throw new HttpException(`Forma de pago with id ${id} not found`, 404);
    }

    return formaPago;
  }

  async update(id: number, updateFormaPagoDto: UpdateFormaPagoDto) {
    const formaPago = await this.formaPagoRepository.findOne({
      where: { idFormaPago: id },
    });

    if (!formaPago) {
      throw new HttpException(`Forma de pago with id ${id} not found`, 404);
    }
    await this.formaPagoRepository.update(id, updateFormaPagoDto);

    return {
      message: `Forma de pago with id ${id} has been updated successfully`,
      status: true,
    };
  }

  async remove(id: number) {
    const formaPago = await this.formaPagoRepository.findOne({
      where: { idFormaPago: id },
    });

    if (!formaPago) {
      throw new HttpException(`Forma de pago with id ${id} not found`, 404);
    }

    await this.formaPagoRepository.update(
      {
        idFormaPago: id,
      },
      {
        estado: false,
      },
    );
    return {
      message: `Forma de pago with id ${id} has been removed successfully`,
      status: true,
    };
  }
}
