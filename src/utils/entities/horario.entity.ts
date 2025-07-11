import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MantenimientoPreventivo } from '../../mantenimiento-preventivo/entities/mantenimiento-preventivo.entity';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  idhorario: number;
  @Column({ type: 'datetime' })
  horaInicio: Date;
  @Column({ type: 'datetime' })
  horaFin: Date;
  @Column({ default: true })
  estado: boolean;
  @OneToMany(
      () => MantenimientoPreventivo,
      (mantenimientoPreventivo) => mantenimientoPreventivo.recurso,
    )
    mantenimientoPreventivo: MantenimientoPreventivo[];
}
