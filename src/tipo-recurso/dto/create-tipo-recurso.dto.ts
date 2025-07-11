import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoRecursoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
