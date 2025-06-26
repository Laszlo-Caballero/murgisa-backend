import { Servicio } from '../../servicio/entities/servicio.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { AsignacionPersonal } from '../../personal/entities/asignacionPersonal.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PagoServicio } from './pagoServicio.entity';
import { NotaSalida } from '../../nota-salida/entities/nota-salida.entity';
import { DetalleVenta } from './detalleVenta.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  idVenta: number;

  @Column()
  fechaInicioServicio: Date;
  @Column()
  fechaFFinServicio: Date;

  @Column({ default: () => 'GETDATE()' })
  fechaVenta: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(
    () => AsignacionPersonal,
    (asignacionPersonal) => asignacionPersonal.venta,
  )
  asignacionPersonal: AsignacionPersonal[];

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  cliente: Relation<Cliente>;

  @ManyToMany(() => Servicio)
  @JoinTable()
  servicios: Servicio[];

  @ManyToOne(() => PagoServicio, (pagoServicio) => pagoServicio.venta)
  pagos: PagoServicio[];

  @OneToMany(() => NotaSalida, (notaSalida) => notaSalida.venta)
  notasSalida: NotaSalida[];

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalleVenta: DetalleVenta[];
}
