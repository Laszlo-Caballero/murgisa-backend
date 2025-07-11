import { Servicio } from '../../servicio/entities/servicio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoServicio {
  @PrimaryGeneratedColumn()
  idTipoServicio: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Servicio, (servicio) => servicio.tipoServicio)
  servicios: Servicio[];
}
