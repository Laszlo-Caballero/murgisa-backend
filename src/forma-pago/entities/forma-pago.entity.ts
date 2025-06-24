import { PagoServicio } from '../../venta/entities/pagoServicio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormaPago {
  @PrimaryGeneratedColumn()
  idFormaPago: number;

  @Column()
  tipo: string;

  @Column({ length: 255, default: '' })
  descripcion: string;

  @Column({ type: 'float', default: 0 })
  comision: number;

  @Column({ default: true })
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @OneToMany(() => PagoServicio, (pagoServicio) => pagoServicio.formaPago)
  pagos: PagoServicio[];
}
