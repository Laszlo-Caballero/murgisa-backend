import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  idCiudad: number; // primary key, number type, identity(1,1)
  @Column()
  nombre: string;

  @OneToMany(() => Cliente, (cliente) => cliente.ciudad)
  clientes: Cliente[];
}
