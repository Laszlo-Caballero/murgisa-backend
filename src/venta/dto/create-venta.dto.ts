import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateVentaDto {
  @IsString()
  @IsNotEmpty()
  fechaInicio: Date;
  @IsString()
  @IsNotEmpty()
  fechaFin: Date;
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  personal: number[];

  @IsNumber()
  clienteId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  servicios: number[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  recursos: number[];

  @IsNumber()
  @IsPositive()
  @Min(1)
  formaPagoId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre: string; // <- string; number, date, boolean, etc., "a"

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @Length(11)
  ruc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(8)
  dni: string;

  @IsOptional()
  @IsEmail() // @.com
  @IsNotEmpty()
  correo: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(9)
  telefono: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(1) // 0 <
  ciudadId: number;
}
