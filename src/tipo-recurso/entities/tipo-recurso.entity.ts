import { Recurso } from '../../recurso/entities/recurso.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoRecurso {
  @PrimaryGeneratedColumn()
  idTipoRecurso: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column({ default: true })
  estado: boolean;
  @OneToMany(() => Recurso, (recurso) => recurso.tipoRecurso)
  recurso: Recurso[];
}
