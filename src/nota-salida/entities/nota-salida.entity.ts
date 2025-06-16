import { Venta } from '../../venta/entities/venta.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotaSalida {
  @PrimaryGeneratedColumn()
  idNotaSalida: number;

  @ManyToOne(() => Venta, (venta) => venta.notasSalida)
  venta: Venta;
}
