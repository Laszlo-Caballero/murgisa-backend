import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoServicioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
