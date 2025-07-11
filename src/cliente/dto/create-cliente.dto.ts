import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string; // <- string; number, date, boolean, etc., "a"

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @Length(11)
  ruc: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  dni: string;

  @IsEmail() // @.com
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  @Length(9)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;
  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1) // 0 <
  ciudadId: number;
}
