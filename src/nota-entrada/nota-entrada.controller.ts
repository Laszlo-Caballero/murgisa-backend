import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotaEntradaService } from './nota-entrada.service';
import { CreateNotaEntradaDto } from './dto/create-nota-entrada.dto';

@Controller('nota-entrada')
export class NotaEntradaController {
  constructor(private readonly notaEntradaService: NotaEntradaService) {}

  @Post()
  create(@Body() createNotaEntradaDto: CreateNotaEntradaDto) {
    return this.notaEntradaService.create(createNotaEntradaDto);
  }

  @Get()
  findAll() {
    return this.notaEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaEntradaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notaEntradaService.remove(+id);
  }
}
