import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoMantenimientoService } from './tipo-mantenimiento.service';
import { CreateTipoMantenimientoDto } from './dto/create-tipo-mantenimiento.dto';
import { UpdateTipoMantenimientoDto } from './dto/update-tipo-mantenimiento.dto';

@Controller('tipo-mantenimiento')
export class TipoMantenimientoController {
  constructor(private readonly tipoMantenimientoService: TipoMantenimientoService) {}

  @Post()
  create(@Body() createTipoMantenimientoDto: CreateTipoMantenimientoDto) {
    return this.tipoMantenimientoService.create(createTipoMantenimientoDto);
  }

  @Get()
  findAll() {
    return this.tipoMantenimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoMantenimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoMantenimientoDto: UpdateTipoMantenimientoDto) {
    return this.tipoMantenimientoService.update(+id, updateTipoMantenimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoMantenimientoService.remove(+id);
  }
}
