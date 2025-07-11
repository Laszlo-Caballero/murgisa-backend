import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Between, Repository } from 'typeorm';
import { Venta } from 'src/venta/entities/venta.entity';
import { MantenimientoCorrectivo } from 'src/mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { endOfMonth, startOfMonth } from 'date-fns';
import { MantenimientoPreventivo } from 'src/mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Log) private logRepository: Repository<Log>,
    @InjectRepository(Venta) private ventaRepository: Repository<Venta>,
    @InjectRepository(MantenimientoPreventivo)
    private mantenimientoRepository: Repository<MantenimientoPreventivo>,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  async description() {
    const lastLog = await this.logRepository.find({
      order: { idLog: 'DESC' },
      take: 5,
    });

    const ventas = await this.ventaRepository.find({
      relations: [
        'cliente',
        'servicios',
        'asignacionPersonal',
        'asignacionPersonal.personal',
        'asignacionPersonal.personal.profesion',
        'detalleVenta',
        'detalleVenta.recurso',
        'detalleVenta.recurso.tipoRecurso',
        'pagos',
        'pagos.formaPago',
      ],
      order: { idVenta: 'DESC' },
    });

    const total = ventas
      .filter((venta) => venta.estado)
      .reduce((acc, venta) => {
        const totalDetalle = venta.detalleVenta.reduce(
          (sum, detalle) => sum + detalle.precio,
          0,
        );
        const totalServicios = venta.servicios.reduce(
          (sum, servicio) => sum + servicio.precio,
          0,
        );

        const totalPersonal = venta.asignacionPersonal.reduce(
          (sum, asignacion) => sum + asignacion.personal.sueldo,
          0,
        );
        return acc + totalDetalle + totalServicios + totalPersonal;
      }, 0);
    const inicioMes = startOfMonth(new Date());
    const finMes = endOfMonth(new Date());

    const ordenes = await this.mantenimientoRepository.count({
      where: {
        estado: true,
        fechaMantenimiento: Between(inicioMes, finMes),
      },
    });

    const ordenesMatenimiento = await this.mantenimientoRepository.find({
      where: { estado: true },
      order: { mantenimientoPreventivoId: 'DESC' },
      take: 3,
    });

    const personalCount = await this.personalRepository.count({
      where: { estado: true },
    });

    const serviciosCount = await this.servicioRepository.count({
      where: { estado: true },
    });

    return {
      message: 'Home data retrieved successfully',
      status: 200,
      data: {
        actividades: lastLog,
        //Cards
        totalVentas: total,
        mantenimiento: ordenes,
        servicios: serviciosCount,
        personal: personalCount,
        //
        lastVentas: ventas.slice(0, 3),
        lastMantenimiento: ordenesMatenimiento,
      },
    };
  }
}
