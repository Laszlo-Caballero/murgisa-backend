import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProfesionDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
}
