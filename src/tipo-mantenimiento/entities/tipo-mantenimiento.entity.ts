import { MantenimientoCorrectivo } from '../../mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
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

  @ManyToMany(
    () => MantenimientoCorrectivo,
    (mantenimientoCorrectivo) => mantenimientoCorrectivo.tipo,
  )
  @JoinTable()
  mantenimientoCorrectivo: MantenimientoCorrectivo[];
}
