import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateRecursoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @Min(0)
    precio: number;

    @IsBoolean()
    @IsOptional()
    estado: boolean = true;

    @IsNumber()
    @Min(0)
    tipoId: number;


    @IsNumber()
    @Min(0)
    proveedorId: number;

    @IsNumber()
    @Min(0)
    disponibilidadId: number;

}
