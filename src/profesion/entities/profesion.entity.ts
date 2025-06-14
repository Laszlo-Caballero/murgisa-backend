import { Personal } from '../../personal/entities/personal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profesion {
  @PrimaryGeneratedColumn()
  idProfesion: number;
  @Column({ length: 100 })
  titulo: string;
  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Personal, (personal) => personal.profesion)
  personal: Personal[];
}
