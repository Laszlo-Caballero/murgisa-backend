import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disponibilidad {
  @PrimaryGeneratedColumn()
  disponibilidadId: number;
  @Column()
  disponibilidad: string;
}
