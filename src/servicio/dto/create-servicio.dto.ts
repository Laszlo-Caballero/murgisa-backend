import { IsString, IsNumber, IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}