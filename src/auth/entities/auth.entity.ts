import { Cargo } from '../../cargo/entities/cargo.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuario')
export class Auth {
  @PrimaryGeneratedColumn()
  idUsuario: number;
  @Column()
  usuario: string;
  @Column()
  contrasena: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.usuario)
  cargo: Cargo;
}
