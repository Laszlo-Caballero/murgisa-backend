import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoMantenimientoDto } from './create-tipo-mantenimiento.dto';

export class UpdateTipoMantenimientoDto extends PartialType(CreateTipoMantenimientoDto) {}
