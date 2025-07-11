import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateMantenimientoPreventivoDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  tipoIds: number[];

  @IsNumber()
  @IsPositive()
  @Min(1)
  recursoId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  personalId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  horarioId: number;

  @IsString()
  @IsNotEmpty()
  fechaMantenimiento: string;
  
  @IsString()
  @IsNotEmpty()
  prioridad: string;
}
