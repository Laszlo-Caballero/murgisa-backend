import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MantenimientoPreventivoService } from './mantenimiento-preventivo.service';
import { CreateMantenimientoPreventivoDto } from './dto/create-mantenimiento-preventivo.dto';
import { UpdateMantenimientoPreventivoDto } from './dto/update-mantenimiento-preventivo.dto';

@Controller('mantenimiento-preventivo')
export class MantenimientoPreventivoController {
  constructor(private readonly mantenimientoPreventivoService: MantenimientoPreventivoService) {}

  @Post()
  create(@Body() createMantenimientoPreventivoDto: CreateMantenimientoPreventivoDto) {
    return this.mantenimientoPreventivoService.create(createMantenimientoPreventivoDto);
  }

  @Get()
  findAll() {
    return this.mantenimientoPreventivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mantenimientoPreventivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMantenimientoPreventivoDto: UpdateMantenimientoPreventivoDto) {
    return this.mantenimientoPreventivoService.update(+id, updateMantenimientoPreventivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantenimientoPreventivoService.remove(+id);
  }
}
