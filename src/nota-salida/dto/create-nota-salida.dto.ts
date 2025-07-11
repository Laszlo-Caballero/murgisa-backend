import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateNotaSalidaDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  idVenta: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  idRecurso: number;

  @IsString()
  @IsNotEmpty()
  fecha: string;
}
