import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('ciudades')
  getCiudades() {
    return this.utilsService.getCiudades();
  }

  @Get('disponibilidad')
  getDisponibilidad() {
    return this.utilsService.getDisponibilidad();
  }
}
