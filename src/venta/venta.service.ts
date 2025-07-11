import { HttpException, Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';
import { AsignacionPersonal } from 'src/personal/entities/asignacionPersonal.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Ciudad } from 'src/cliente/entities/ciudades.entity';
import { parse } from 'date-fns';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { DetalleVenta } from './entities/detalleVenta.entity';
import { PagoServicio } from './entities/pagoServicio.entity';
import { FormaPago } from 'src/forma-pago/entities/forma-pago.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
    @InjectRepository(AsignacionPersonal)
    private readonly asignacionPersonalRepository: Repository<AsignacionPersonal>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Recurso)
    private readonly recursoRepository: Repository<Recurso>,
    @InjectRepository(DetalleVenta)
    private readonly detalleRepository: Repository<DetalleVenta>,
    @InjectRepository(PagoServicio)
    private readonly pagoServicioRepository: Repository<PagoServicio>,
    @InjectRepository(FormaPago)
    private readonly formaPagoRepository: Repository<FormaPago>,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    const {
      fechaInicio,
      fechaFin,
      personal,
      clienteId,
      servicios,
      recursos,
      formaPagoId,
      ...newCliente
    } = createVentaDto;

    const ciudad = await this.ciudadRepository.findOne({
      where: { idCiudad: createVentaDto.ciudadId },
    });

    if (!ciudad) {
      throw new HttpException('Ciudad no encontrada', 404);
    }

    const parseDate = parse(
      newCliente.fechaNacimiento,
      'yyyy-MM-dd',
      new Date(),
    );

    const cliente =
      clienteId != -1
        ? await this.clienteRepository.findOne({
            where: { idCliente: clienteId },
          })
        : await this.clienteRepository.save({
            ciudad,
            ...newCliente,
            fechaNacimiento: parseDate,
          });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', 404);
    }

    const findServicios = await Promise.all(
      createVentaDto.servicios.map(async (servicioId) => {
        const servicio = await this.servicioRepository.findOne({
          where: { idServicio: servicioId },
        });
        if (!servicio) {
          throw new HttpException(
            `Servicio con ID ${servicioId} no encontrado`,
            404,
          );
        }
        return servicio;
      }),
    );

    const personales = await Promise.all(
      personal.map(async (id) => {
        const personal = await this.personalRepository.findOne({
          where: { idPersonal: id },
        });
        if (!personal) {
          throw new HttpException(`Personal con ID ${id} no encontrado`, 404);
        }
        return personal;
      }),
    );

    if (personal.length === 0) {
      throw new HttpException('Debe asignar al menos un personal', 400);
    }

    const recurso = await Promise.all(
      recursos.map(async (recursoId) => {
        const recurso = await this.recursoRepository.findOne({
          where: { idRecurso: recursoId },
        });
        if (!recurso) {
          throw new HttpException(
            `Recurso con ID ${recursoId} no encontrado`,
            404,
          );
        }
        return recurso;
      }),
    );

    const formaPago = await this.formaPagoRepository.findOne({
      where: { idFormaPago: formaPagoId },
    });

    if (!formaPago) {
      throw new HttpException(
        `Forma de pago con ID ${formaPagoId} no encontrada`,
        404,
      );
    }

    const newVenta = this.ventaRepository.create({
      fechaInicioServicio: fechaInicio,
      fechaFFinServicio: fechaFin,
      cliente,
      servicios: findServicios,
    });

    const saveVenta = await this.ventaRepository.save(newVenta);
    const asignaciones = personales.map((p) => {
      const asignacion = this.asignacionPersonalRepository.create({
        personal: p,
        venta: saveVenta,
        costo: p.sueldo,
        estado: true,
      });
      return this.asignacionPersonalRepository.save(asignacion);
    });

    await Promise.all(asignaciones);

    const recursoAsignaciones = recurso.map((r) => {
      const asignacion = this.detalleRepository.create({
        recurso: r,
        venta: saveVenta,
        estado: true,
        precio: r.precio,
      });
      return this.detalleRepository.save(asignacion);
    });

    await Promise.all(recursoAsignaciones);

    const pagoServicio = this.pagoServicioRepository.create({
      venta: saveVenta,
      formaPago,
    });

    await this.pagoServicioRepository.save(pagoServicio);

    const log = this.logRepository.create({
      mensaje: `Nueva venta creada con éxito para el cliente ${cliente.nombre}`,
      tipo: 'Venta',
    });

    await this.logRepository.save(log);

    const ventas = await this.ventaRepository.find({
      relations: [
        'asignacionPersonal',
        'cliente',
        'servicios',
        'pagos',
        'notasSalida',
        'detalleVenta',
        'detalleVenta.recurso',
      ],
    });

    return {
      message: 'Venta created successfully',
      status: 201,
      data: ventas,
    };
  }

  async findAll() {
    const ventas = await this.ventaRepository.find({
      relations: [
        'asignacionPersonal',
        'cliente',
        'servicios',
        'pagos',
        'notasSalida',
        'detalleVenta',
        'detalleVenta.recurso',
      ],
    });

    return {
      message: 'Ventas retrieved successfully',
      data: ventas,
      status: 200,
    };
  }

  findOne(id: number) {
    const venta = this.ventaRepository.findOne({
      where: { idVenta: id },
      relations: [
        'asignacionPersonal',
        'cliente',
        'servicios',
        'pagos',
        'notasSalida',
        'detalleVenta',
        'detalleVenta.recurso',
      ],
    });

    if (!venta) {
      throw new HttpException(`Venta with ID ${id} not found`, 404);
    }

    return {
      message: 'Venta retrieved successfully',
      data: venta,
      status: 200,
    };
  }

  async remove(id: number) {
    const venta = await this.ventaRepository.findOne({
      where: { idVenta: id },
    });

    if (!venta) {
      throw new HttpException(`Venta with ID ${id} not found`, 404);
    }

    await this.ventaRepository.update(id, { estado: false });

    await this.logRepository.save({
      mensaje: `La venta con ID ${id} ha sido eliminada`,
      tipo: 'Venta',
    });

    const ventas = await this.ventaRepository.find({
      relations: [
        'asignacionPersonal',
        'cliente',
        'servicios',
        'pagos',
        'notasSalida',
        'detalleVenta',
        'detalleVenta.recurso',
      ],
    });

    return {
      message: 'Venta deleted successfully',
      status: 200,
      data: ventas,
    };
  }
}
