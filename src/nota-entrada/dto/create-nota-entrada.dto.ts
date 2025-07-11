import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateNotaEntradaDto {
  @IsNumber()
  @IsPositive()
  idRecurso: number;

  @IsNumber()
  @IsPositive()
  idProveedor: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
  @IsNumber()
  @IsPositive()
  monto: number;
  @IsString()
  @IsNotEmpty()
  fecha: string;
}
