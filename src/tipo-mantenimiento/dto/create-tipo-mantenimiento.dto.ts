import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTipoMantenimientoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;   

    @IsString()
    @IsNotEmpty()
    duracion: string;

    @IsBoolean()
    @IsOptional()
    estado: boolean = true;
}
