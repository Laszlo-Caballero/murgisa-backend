import { PartialType } from '@nestjs/mapped-types';
import { CreateNotaSalidaDto } from './create-nota-salida.dto';

export class UpdateNotaSalidaDto extends PartialType(CreateNotaSalidaDto) {}
