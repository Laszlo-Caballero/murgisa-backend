import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  descripcion: string;
  @IsString()
  @IsNotEmpty()
  presupuesto: string;

  @IsBoolean()
  @IsOptional()
  estado: boolean;
}
