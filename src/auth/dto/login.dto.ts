import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  correo: string;
  @IsString()
  @IsNotEmpty()
  contrasena: string;
}
