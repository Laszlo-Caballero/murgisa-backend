import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  idLog: number;
  @Column()
  tipo: string;
  @Column()
  mensaje: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
