import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateFormaPagoDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  comision: number;

  @IsBoolean()
  @IsOptional()
  estado?: boolean = true;
}
