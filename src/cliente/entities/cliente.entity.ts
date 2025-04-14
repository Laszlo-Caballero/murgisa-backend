import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  direccion: string;

  @Column()
  fechaNacimiento: Date;
}
