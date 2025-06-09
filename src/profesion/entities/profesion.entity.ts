import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profesion {
  @PrimaryGeneratedColumn()
  idProfesion: number;
  @Column({ length: 100 })
  titulo: string;
  @Column({ default: true })
  estado: boolean;
}
