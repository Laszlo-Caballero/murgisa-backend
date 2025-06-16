import { Injectable } from '@nestjs/common';
import { CreateNotaSalidaDto } from './dto/create-nota-salida.dto';
import { UpdateNotaSalidaDto } from './dto/update-nota-salida.dto';

@Injectable()
export class NotaSalidaService {
  create(createNotaSalidaDto: CreateNotaSalidaDto) {
    return 'This action adds a new notaSalida';
  }

  findAll() {
    return `This action returns all notaSalida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notaSalida`;
  }

  update(id: number, updateNotaSalidaDto: UpdateNotaSalidaDto) {
    return `This action updates a #${id} notaSalida`;
  }

  remove(id: number) {
    return `This action removes a #${id} notaSalida`;
  }
}
