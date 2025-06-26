import { Personal } from '../../personal/entities/personal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('Usuario')
export class Auth {
  @PrimaryGeneratedColumn()
  idUsuario: number;
  @Column()
  usuario: string;
  @Column()
  contrasena: string;
  @Column({ default: '' })
  correo: string;
  @OneToOne(() => Personal, (personal) => personal.usuario)
  @JoinColumn()
  personal: Relation<Personal>;
}
