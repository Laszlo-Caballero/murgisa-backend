import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  idDepartamento: number;
  @Column({ length: 50, default: '' })
  titulo: string;
  @Column({ length: 100 })
  descripcion: string;
  @Column({ default: true })
  estado: boolean;
  @Column({ type: 'float', default: 0 })
  presupuesto: number;
}
