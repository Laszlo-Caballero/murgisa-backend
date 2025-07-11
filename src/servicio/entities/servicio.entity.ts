import { TipoServicio } from '../../tipo-servicio/entities/tipoServicio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  idServicio: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ type: 'float' })
  precio: number;

  @ManyToOne(() => TipoServicio, (tipoServicio) => tipoServicio.idTipoServicio)
  tipoServicio: TipoServicio;
}
