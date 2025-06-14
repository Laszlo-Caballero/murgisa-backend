import { Personal } from '../../personal/entities/personal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  idCargo: number;
  @Column({ length: 50 })
  cargo: string;
  @Column({ length: 100 })
  descripcion: string;
  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Personal, (personal) => personal.cargo)
  usuario: Personal[];
}
