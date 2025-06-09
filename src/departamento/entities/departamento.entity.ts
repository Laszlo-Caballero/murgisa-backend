import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()
    idDepartamento: number;
    @Column({ length: 100 })
    descripcion: string;
    @Column({ default: true })
    estado: boolean;
}
