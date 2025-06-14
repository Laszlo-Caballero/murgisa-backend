import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePersonalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;
  @IsString()
  @IsNotEmpty()
  apellido_materno: string;
  @IsNumber()
  @Min(0)
  sueldo: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  numeroDocumento: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(9)
  telefono: string;

  @IsBoolean()
  @IsOptional()
  estado: boolean = true;

  @IsNumber()
  @Min(0)
  cargoId: number;

  @IsNumber()
  @Min(0)
  profesionId: number;
  @IsNumber()
  @Min(0)
  departamentoId: number;
}
