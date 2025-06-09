
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {
    @PrimaryGeneratedColumn()
    idCargo: number;
    @Column({ length: 50 })
    cargo: string;
    @Column({ length: 100 })
    descripcion: string;
    @Column({ default: true })
    estado: boolean;
}
