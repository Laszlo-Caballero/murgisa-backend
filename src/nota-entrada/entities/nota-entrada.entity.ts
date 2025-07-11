import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class NotaEntrada {
  @PrimaryGeneratedColumn()
  idNotaEntrada: number;

  @ManyToOne(() => Recurso, (recurso) => recurso.notasEntrada)
  recurso: Relation<Recurso>;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.notasEntrada)
  proveedor: Relation<Proveedor>;

  @Column()
  cantidad: number;
  @Column()
  monto: number;

  @Column({ default: true })
  estado: boolean;

  @Column({ type: 'datetime' })
  fecha: Date;
}
