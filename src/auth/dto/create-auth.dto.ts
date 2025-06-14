import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @IsNumber()
  @Min(0)
  personalId: number;
}
