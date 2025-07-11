import { PartialType } from '@nestjs/mapped-types';
import { CreateMantenimientoPreventivoDto } from './create-mantenimiento-preventivo.dto';

export class UpdateMantenimientoPreventivoDto extends PartialType(CreateMantenimientoPreventivoDto) {}
