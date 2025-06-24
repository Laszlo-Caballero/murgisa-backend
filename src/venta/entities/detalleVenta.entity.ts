import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  idDetalleVenta: number;
  @Column()
  precio: number;
  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Venta, (venta) => venta.detalleVenta)
  venta: Venta;
  @ManyToOne(() => Recurso, (recurso) => recurso.detalleVenta)
  recurso: Recurso;
}
