import { MantenimientoCorrectivo } from '../../mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
import { MantenimientoPreventivo } from '../../mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TipoMantenimiento {
  @PrimaryGeneratedColumn()
  tipoMantenimientoId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  duracion: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToMany(
    () => MantenimientoCorrectivo,
    (mantenimientoCorrectivo) => mantenimientoCorrectivo.tipo,
  )
  @JoinTable()
  mantenimientoCorrectivo: MantenimientoCorrectivo[];

  @ManyToMany(
    () => MantenimientoPreventivo,
    (mantenimientoPreventivo) => mantenimientoPreventivo.tipo,
  )
   @JoinTable()
  mantenimientoPreventivo: MantenimientoPreventivo[];
}
