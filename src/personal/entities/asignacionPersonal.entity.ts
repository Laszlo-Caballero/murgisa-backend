import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Personal } from './personal.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class AsignacionPersonal {
  @PrimaryGeneratedColumn()
  idAsignacionPersonal: number;

  @Column({ type: 'float' })
  costo: number;
  @Column()
  estado: boolean;

  @ManyToOne(() => Personal, (personal) => personal.asignacionPersonal)
  personal: Personal;

  @ManyToOne(() => Venta, (venta) => venta.asignacionPersonal)
  venta: Venta;
}
