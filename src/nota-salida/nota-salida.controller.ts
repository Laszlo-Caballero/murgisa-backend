import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotaSalidaService } from './nota-salida.service';
import { CreateNotaSalidaDto } from './dto/create-nota-salida.dto';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaSalidaService.remove(+id);
  }
}
