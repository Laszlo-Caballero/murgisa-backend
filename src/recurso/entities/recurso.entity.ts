import { MantenimientoCorrectivo } from '../../mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
import { Disponibilidad } from '../../utils/entities/disponibilidad.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { TipoRecurso } from '../../tipo-recurso/entities/tipo-recurso.entity';
import { DetalleVenta } from '../../venta/entities/detalleVenta.entity';
import { MantenimientoPreventivo } from '../../mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotaSalida } from '../../nota-salida/entities/nota-salida.entity';
import { NotaEntrada } from '../../nota-entrada/entities/nota-entrada.entity';

@Entity()
export class Recurso {
  @PrimaryGeneratedColumn()
  idRecurso: number;
  @Column()
  nombre: string;
  @Column()
  precio: number;
  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => TipoRecurso, (tipoRecurso) => tipoRecurso.recurso)
  tipoRecurso: TipoRecurso;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.recurso)
  proveedor: Proveedor;

  @ManyToOne(
    () => Disponibilidad,
    (disponibilidad) => disponibilidad.disponibilidad,
  )
  disponibilidad: Disponibilidad;

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.recurso)
  detalleVenta: DetalleVenta[];

  @OneToMany(
    () => MantenimientoCorrectivo,
    (mantenimientoCorrectivo) => mantenimientoCorrectivo.recurso,
  )
  mantenimientoCorrectivo: MantenimientoCorrectivo[];

  @OneToMany(
    () => MantenimientoPreventivo,
    (mantenimientoPreventivo) => mantenimientoPreventivo.recurso,
  )
  mantenimientoPreventivo: MantenimientoPreventivo[];

  @OneToMany(() => NotaSalida, (notaSalida) => notaSalida.recurso)
  notasSalida: NotaSalida[];

  @OneToMany(() => NotaEntrada, (notaEntrada) => notaEntrada.recurso)
  notasEntrada: NotaEntrada[];
}
