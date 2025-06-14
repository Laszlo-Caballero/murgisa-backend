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
  @IsNumber()
  @Min(0)
  presupuesto: number;

  @IsBoolean()
  @IsOptional()
  estado: boolean;
}
