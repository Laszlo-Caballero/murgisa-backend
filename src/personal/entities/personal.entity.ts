import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AsignacionPersonal } from './asignacionPersonal.entity';
import { Cargo } from '../../cargo/entities/cargo.entity';
import { Auth } from '../../auth/entities/auth.entity';
import { Profesion } from '../../profesion/entities/profesion.entity';
import { Departamento } from '../../departamento/entities/departamento.entity';
import { MantenimientoCorrectivo } from '../../mantenimiento-correctivo/entities/mantenimiento-correctivo.entity';
import { MantenimientoPreventivo } from '../../mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';
@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  idPersonal: number;
  @Column({ length: 100 })
  nombre: string;
  @Column({ length: 100 })
  apellido_paterno: string;
  @Column({ length: 100 })
  apellido_materno: string;
  @Column({ type: 'float' })
  sueldo: number;
  @Column({ length: 8 })
  numeroDocumento: string;
  @Column({ length: 9 })
  telefono: string;
  @Column()
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaIngreso: Date;

  @OneToMany(
    () => AsignacionPersonal,
    (asignacionPersonal) => asignacionPersonal.personal,
  )
  asignacionPersonal: AsignacionPersonal[];

  @ManyToOne(() => Cargo, (cargo) => cargo.usuario)
  cargo: Cargo;

  @OneToOne(() => Auth, (auth) => auth.personal)
  @JoinColumn()
  usuario: Auth;

  @ManyToOne(() => Profesion, (profesion) => profesion.personal)
  profesion: Profesion;

  @ManyToOne(() => Departamento, (departamento) => departamento.personal)
  departamento: Departamento;

  @ManyToOne(
    () => MantenimientoCorrectivo,
    (mantenimientoCorrectivo) => mantenimientoCorrectivo.personal,
  )
  mantenimientoCorrectivo: MantenimientoCorrectivo[];
  @ManyToOne(
    () => MantenimientoPreventivo,
    (mantenimientoPreventivo) => mantenimientoPreventivo.personal,
  )
  mantenimientoPreventivo: MantenimientoPreventivo[];
}
