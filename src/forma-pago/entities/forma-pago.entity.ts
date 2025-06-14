import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormaPago {
  @PrimaryGeneratedColumn()
  idFormaPago: number;

  @Column()
  tipo: string;

  @Column({ type: 'float', default: 0 })
  comision: number;

  @Column({ default: true })
  estado: boolean;
}
