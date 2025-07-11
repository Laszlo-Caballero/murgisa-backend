import { Recurso } from '../../recurso/entities/recurso.entity';
import { Venta } from '../../venta/entities/venta.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class NotaSalida {
  @PrimaryGeneratedColumn()
  idNotaSalida: number;

  @ManyToOne(() => Venta, (venta) => venta.notasSalida)
  venta: Relation<Venta>;

  @ManyToOne(() => Recurso, (recurso) => recurso.notasSalida)
  recurso: Relation<Recurso>;

  @Column({ default: true })
  estado: boolean;

  @Column({ type: 'datetime' })
  fecha: Date;
}
