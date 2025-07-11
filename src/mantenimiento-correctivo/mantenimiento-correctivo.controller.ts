import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MantenimientoCorrectivoService } from './mantenimiento-correctivo.service';
import { CreateMantenimientoCorrectivoDto } from './dto/create-mantenimiento-correctivo.dto';

@Controller('mantenimiento-correctivo')
export class MantenimientoCorrectivoController {
  constructor(
    private readonly mantenimientoCorrectivoService: MantenimientoCorrectivoService,
  ) {}

  @Post()
  create(
    @Body() createMantenimientoCorrectivoDto: CreateMantenimientoCorrectivoDto,
  ) {
    return this.mantenimientoCorrectivoService.create(
      createMantenimientoCorrectivoDto,
    );
  }

  @Get()
  findAll() {
    return this.mantenimientoCorrectivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantenimientoCorrectivoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantenimientoCorrectivoService.remove(+id);
  }
}
