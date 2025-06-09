import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudad } from './ciudades.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombre: string;

  @Column({ type: 'char', length: 8 })
  dni: string;

  @Column()
  correo: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;
  @Column({ type: 'varchar', length: 100 })
  razonSocial: string;

  @Column()
  direccion: string;

  @Column()
  fechaNacimiento: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.clientes)
  ciudad: Ciudad;
}
