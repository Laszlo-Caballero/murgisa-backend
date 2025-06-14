import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCargoDto {
  @IsString()
  @IsNotEmpty()
  cargo: string;
  @IsString()
  @IsNotEmpty()
  descripcion: string;
  @IsBoolean()
  @IsOptional()
  estado: boolean = true;
}
