import { Injectable } from '@nestjs/common';
import { CreateTipoMantenimientoDto } from './dto/create-tipo-mantenimiento.dto';
import { UpdateTipoMantenimientoDto } from './dto/update-tipo-mantenimiento.dto';

@Injectable()
export class TipoMantenimientoService {
  create(createTipoMantenimientoDto: CreateTipoMantenimientoDto) {
    return 'This action adds a new tipoMantenimiento';
  }

  findAll() {
    return `This action returns all tipoMantenimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoMantenimiento`;
  }

  update(id: number, updateTipoMantenimientoDto: UpdateTipoMantenimientoDto) {
    return `This action updates a #${id} tipoMantenimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoMantenimiento`;
  }
}
