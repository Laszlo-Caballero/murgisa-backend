import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ciudad } from './ciudades.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombre: string;

  @Column({ type: 'char', length: 8 })
  dni: string;
  @Column({ type: 'char', length: 11, default: '' })
  ruc: string;
  @Column()
  correo: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;
  @Column({ type: 'varchar', length: 100, default: '' })
  razonSocial: string;

  @Column()
  direccion: string;

  @Column()
  fechaNacimiento: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.clientes)
  ciudad: Ciudad;

  @OneToMany(() => Venta, (venta) => venta.cliente)
  ventas: Venta[];
}
