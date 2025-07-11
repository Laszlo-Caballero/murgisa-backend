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

export class CreateMantenimientoCorrectivoDto {
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

  @IsString()
  @IsNotEmpty()
  fechaInicio: string;
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Type(() => Number)
  precio: number;
}
