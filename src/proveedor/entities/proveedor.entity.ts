import { Recurso } from '../../recurso/entities/recurso.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  idProovedor: number;
  @Column()
  razonSocial: string;
  @Column()
  ruc: string;
  @Column()
  nombreResponsable: string;
  @Column()
  dniResponsable: string;
  @Column()
  correo: string;
  @Column()
  telefono: string;
  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Recurso, (recurso) => recurso.proveedor)
  recurso: Recurso[];
}
