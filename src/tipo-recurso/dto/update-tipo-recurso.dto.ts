import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoRecursoDto } from './create-tipo-recurso.dto';

export class UpdateTipoRecursoDto extends PartialType(CreateTipoRecursoDto) {}
