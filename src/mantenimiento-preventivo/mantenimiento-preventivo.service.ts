import { Injectable } from '@nestjs/common';
import { CreateMantenimientoPreventivoDto } from './dto/create-mantenimiento-preventivo.dto';
import { UpdateMantenimientoPreventivoDto } from './dto/update-mantenimiento-preventivo.dto';

@Injectable()
export class MantenimientoPreventivoService {
  create(createMantenimientoPreventivoDto: CreateMantenimientoPreventivoDto) {
    return 'This action adds a new mantenimientoPreventivo';
  }

  findAll() {
    return `This action returns all mantenimientoPreventivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mantenimientoPreventivo`;
  }

  update(id: number, updateMantenimientoPreventivoDto: UpdateMantenimientoPreventivoDto) {
    return `This action updates a #${id} mantenimientoPreventivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} mantenimientoPreventivo`;
  }
}
