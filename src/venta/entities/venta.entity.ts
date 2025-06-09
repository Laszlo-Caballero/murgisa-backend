import { AsignacionPersonal } from '../../personal/entities/asignacionPersonal.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
