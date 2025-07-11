import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Length,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 500)
  descripcion: string;

  @IsString()
  @Length(1, 50)
  duracion: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  precio: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsNumber()
  @IsPositive()
  tipoServicioId: number;
}
