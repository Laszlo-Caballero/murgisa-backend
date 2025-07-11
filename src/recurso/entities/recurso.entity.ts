import { MantenimientoCorrectivo } from '../../mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { TipoRecurso } from '../../tipo-recurso/entities/tipo-recurso.entity';
import { DetalleVenta } from '../../venta/entities/detalleVenta.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.recurso)
  detalleVenta: DetalleVenta[];

  @OneToMany(
    () => MantenimientoCorrectivo,
    (mantenimientoCorrectivo) => mantenimientoCorrectivo.recurso,
  )
  mantenimientoCorrectivo: MantenimientoCorrectivo[];
}
