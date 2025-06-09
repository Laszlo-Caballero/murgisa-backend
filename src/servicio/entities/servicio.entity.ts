import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
