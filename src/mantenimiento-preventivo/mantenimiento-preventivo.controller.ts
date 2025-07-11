import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MantenimientoPreventivoService } from './mantenimiento-preventivo.service';
import { CreateMantenimientoPreventivoDto } from './dto/create-mantenimiento-preventivo.dto';
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
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mantenimientoPreventivoService.remove(+id);
  }
}
