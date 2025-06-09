import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AsignacionPersonal } from './asignacionPersonal.entity';

@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  idPersonal: number;
  @Column({ length: 100 })
  nombre: string;
  @Column({ length: 100 })
  apellido_parterno: string;
  @Column({ length: 100 })
  apellido_materno: string;
  @Column({ type: 'float' })
  sueldo: number;
  @Column()
  estado: boolean;
  @OneToMany(
    () => AsignacionPersonal,
    (asignacionPersonal) => asignacionPersonal.personal,
  )
  asignacionPersonal: AsignacionPersonal[];
}
