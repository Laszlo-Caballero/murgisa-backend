import { Personal } from '../../personal/entities/personal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  idDepartamento: number;
  @Column({ length: 50, default: '' })
  titulo: string;
  @Column({ length: "MAX" })
  descripcion: string;
  @Column({ default: true })
  estado: boolean;
  @Column({ type: 'float', default: 0 })
  presupuesto: number;

  @OneToMany(() => Personal, (personal) => personal.departamento)
  personal: Personal[];
}
