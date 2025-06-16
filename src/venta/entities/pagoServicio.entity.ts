import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { FormaPago } from '../../forma-pago/entities/forma-pago.entity';

@Entity()
export class PagoServicio {
  @PrimaryGeneratedColumn()
  idPagoServicio: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Venta, (venta) => venta.pagos)
  venta: Venta;

  @ManyToOne(() => FormaPago, (formaPago) => formaPago.pagos)
  formaPago: FormaPago;
}
