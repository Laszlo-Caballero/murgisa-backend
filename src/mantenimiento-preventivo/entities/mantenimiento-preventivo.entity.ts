import { Personal } from '../../personal/entities/personal.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';
import { Horario } from '../../utils/entities/horario.entity';
import { TipoMantenimiento } from '../../tipo-mantenimiento/entities/tipo-mantenimiento.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class MantenimientoPreventivo {
  @PrimaryGeneratedColumn()
  mantenimientoPreventivoId: number;

  @ManyToOne(() => Recurso, (recurso) => recurso.mantenimientoPreventivo)
  recurso: Relation<Recurso>;

  @ManyToOne(() => Personal, (personal) => personal.mantenimientoPreventivo)
  personal: Relation<Personal>;

  @ManyToOne(() => Horario, (horario) => horario.mantenimientoPreventivo)
  horario: Relation<Personal>;

  @ManyToMany(() => TipoMantenimiento, (tipo) => tipo.mantenimientoPreventivo)
  tipo: TipoMantenimiento[];

  @Column({ type: 'datetime' })
  fechaMantenimiento: Date;

  @Column()
  prioridad: string;

  @Column({ default: true })
  estado: boolean;
}
