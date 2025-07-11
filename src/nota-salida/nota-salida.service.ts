import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotaSalidaDto } from './dto/create-nota-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotaSalida } from './entities/nota-salida.entity';
import { Log } from 'src/home/entities/log.entity';
import { Repository } from 'typeorm';
import { Venta } from 'src/venta/entities/venta.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { parse } from 'date-fns';

@Injectable()
export class NotaSalidaService {
  constructor(
    @InjectRepository(NotaSalida)
    private readonly notaSalidaRepository: Repository<NotaSalida>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
  ) {}

  async create(createNotaSalidaDto: CreateNotaSalidaDto) {
    const { idRecurso, idVenta, fecha } = createNotaSalidaDto;
    const venta = await this.ventaRepository.findOne({ where: { idVenta } });
    if (!venta) {
      throw new HttpException('Venta not found', 404);
    }

    const recurso = await this.recursoRepository.findOne({
      where: { idRecurso },
    });
    if (!recurso) {
      throw new HttpException('Recurso not found', 404);
    }

    const parsedFecha = parse(fecha, 'yyyy-MM-dd', new Date());

    const notaSalida = this.notaSalidaRepository.create({
      venta,
      recurso,
      fecha: parsedFecha,
    });

    await this.notaSalidaRepository.save(notaSalida);
    await this.logRepository.save({
      tipo: 'Nota de Salida',
      mensaje: `Se ha creado una nota de salida para el recurso ${recurso.nombre}`,
    });

    const notas = await this.notaSalidaRepository.find({
      relations: ['venta', 'recurso'],
    });

    return {
      message: 'Nota de salida creada exitosamente',
      status: 201,
      data: notas,
    };
  }

  async findAll() {
    const notasSalida = await this.notaSalidaRepository.find({
      relations: ['venta', 'recurso'],
    });

    return {
      message: 'Notas de salida obtenidas exitosamente',
      status: 200,
      data: notasSalida,
    };
  }

  async findOne(id: number) {
    const notaSalida = await this.notaSalidaRepository.findOne({
      where: { idNotaSalida: id },
      relations: ['venta', 'recurso'],
    });

    if (!notaSalida) {
      throw new HttpException('Nota de salida not found', 404);
    }

    return {
      message: 'Nota de salida obtenida exitosamente',
      status: 200,
      data: notaSalida,
    };
  }

  async remove(id: number) {
    const notaSalida = await this.notaSalidaRepository.findOne({
      where: { idNotaSalida: id },
    });

    if (!notaSalida) {
      throw new HttpException('Nota de salida not found', 404);
    }

    await this.notaSalidaRepository.update(id, { estado: false });
    await this.logRepository.save({
      tipo: 'Nota de Salida',
      mensaje: `Se ha Desactivado la nota de salida con ID ${id}`,
    });

    const notas = await this.notaSalidaRepository.find({
      relations: ['venta', 'recurso'],
    });

    return {
      message: 'Nota de salida desactivada exitosamente',
      status: 200,
      data: notas,
    };
  }
}
