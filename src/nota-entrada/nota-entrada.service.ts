import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotaEntradaDto } from './dto/create-nota-entrada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotaEntrada } from './entities/nota-entrada.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { parse } from 'date-fns';

@Injectable()
export class NotaEntradaService {
  constructor(
    @InjectRepository(NotaEntrada)
    private readonly notaEntradaRepository: Repository<NotaEntrada>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createNotaEntradaDto: CreateNotaEntradaDto) {
    const { idRecurso, idProveedor, fecha } = createNotaEntradaDto;

    const recurso = await this.recursoRepository.findOneBy({
      idRecurso: idRecurso,
    });

    if (!recurso) {
      throw new HttpException('Recurso not found', 404);
    }

    const proveedor = await this.proveedorRepository.findOneBy({
      idProovedor: idProveedor,
    });

    if (!proveedor) {
      throw new HttpException('Proveedor not found', 404);
    }

    const parsedFecha = parse(fecha, 'yyyy-MM-dd', new Date());

    const notaEntrada = this.notaEntradaRepository.create({
      recurso,
      proveedor,
      fecha: parsedFecha,
      cantidad: createNotaEntradaDto.cantidad,
      monto: createNotaEntradaDto.monto,
    });

    await this.notaEntradaRepository.save(notaEntrada);

    await this.logRepository.save({
      tipo: 'Nota de Entrada',
      mensaje: `Se ha creado una nota de entrada para el recurso ${recurso.nombre} del proveedor ${proveedor.razonSocial}`,
    });

    const notas = await this.notaEntradaRepository.find({
      relations: ['recurso', 'proveedor'],
    });

    return {
      message: 'Nota de entrada creada exitosamente',
      status: 201,
      data: notas,
    };
  }

  async findAll() {
    const notasEntrada = await this.notaEntradaRepository.find({
      relations: ['recurso', 'proveedor'],
    });
    return {
      message: 'Todas las notas de entrada',
      status: 200,
      data: notasEntrada,
    };
  }

  async findOne(id: number) {
    const notaEntrada = await this.notaEntradaRepository.findOne({
      where: { idNotaEntrada: id },
      relations: ['recurso', 'proveedor'],
    });

    if (!notaEntrada) {
      throw new HttpException('Nota de entrada no encontrada', 404);
    }

    return {
      message: 'Nota de entrada encontrada',
      status: 200,
      data: notaEntrada,
    };
  }

  async remove(id: number) {
    const notaEntrada = await this.notaEntradaRepository.findOne({
      where: { idNotaEntrada: id },
    });

    if (!notaEntrada) {
      throw new HttpException('Nota de entrada not found', 404);
    }

    await this.notaEntradaRepository.update(
      { idNotaEntrada: id },
      { estado: false },
    );

    await this.logRepository.save({
      tipo: 'Nota de Entrada',
      mensaje: `La nota de entrada con ID ${id} ha sido eliminada`,
    });

    const notas = await this.notaEntradaRepository.find({
      relations: ['recurso', 'proveedor'],
    });

    return {
      message: 'Nota de entrada eliminada exitosamente',
      status: 200,
      data: notas,
    };
  }
}
