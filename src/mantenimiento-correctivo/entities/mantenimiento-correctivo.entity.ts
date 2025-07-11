import { Personal } from '../../personal/entities/personal.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';
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
export class MantenimientoCorrectivo {
  @PrimaryGeneratedColumn()
  mantenimientoCorrectivoId: number;

  @ManyToMany(() => TipoMantenimiento, (tipo) => tipo.mantenimientoCorrectivo)
  tipo: TipoMantenimiento[];

  @ManyToOne(() => Recurso, (recurso) => recurso.mantenimientoCorrectivo)
  recurso: Relation<Recurso>;

  @ManyToOne(() => Personal, (personal) => personal.mantenimientoCorrectivo)
  personal: Relation<Personal>;

  @Column({ type: 'datetime' })
  fechaInicio: Date;

  @Column({ type: 'float' })
  precio: number;

  @Column({ default: true })
  estado: boolean;
}
