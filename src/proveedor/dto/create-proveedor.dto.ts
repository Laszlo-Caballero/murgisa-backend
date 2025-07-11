import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProveedorDto {
    @IsString()
    @IsNotEmpty()
    razonSocial: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    ruc: string;
    @IsString()
    @IsNotEmpty()
    nombreResponsable: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(8)
    dniResponsable: string;
    @IsString()
    @IsNotEmpty()
    correo: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(9)
    telefono: string;
}
