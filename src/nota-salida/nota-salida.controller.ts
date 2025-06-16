import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotaSalidaService } from './nota-salida.service';
import { CreateNotaSalidaDto } from './dto/create-nota-salida.dto';
import { UpdateNotaSalidaDto } from './dto/update-nota-salida.dto';

@Controller('nota-salida')
export class NotaSalidaController {
  constructor(private readonly notaSalidaService: NotaSalidaService) {}

  @Post()
  create(@Body() createNotaSalidaDto: CreateNotaSalidaDto) {
    return this.notaSalidaService.create(createNotaSalidaDto);
  }

  @Get()
  findAll() {
    return this.notaSalidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaSalidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotaSalidaDto: UpdateNotaSalidaDto) {
    return this.notaSalidaService.update(+id, updateNotaSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaSalidaService.remove(+id);
  }
}
