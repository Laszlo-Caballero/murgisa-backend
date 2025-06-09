import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from './entities/profesion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesionService {
  constructor(
    @InjectRepository(Profesion)
    private profesionRespository: Repository<Profesion>,
  ) {}

  create(createProfesionDto: CreateProfesionDto) {
    const newProfesion = this.profesionRespository.create(createProfesionDto);

    return this.profesionRespository.save(newProfesion);
  }

  async findAll() {
    const profesiones = await this.profesionRespository.find();
    return profesiones;
  }

  async findOne(id: number) {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });

    if (!profesion) {
      throw new HttpException(`Profesion with id ${id} not found`, 404);
    }

    return profesion;
  }

  async update(id: number, updateProfesionDto: UpdateProfesionDto) {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });
    if (!profesion) {
      throw new HttpException(`Profesion with id ${id} not found`, 404);
    }

    await this.profesionRespository.update(
      {
        idProfesion: id,
      },
      {
        ...updateProfesionDto,
      },
    );

    return {
      message: `Profesion with id ${id} has been updated successfully`,
      status: true,
    };
  }

  async remove(id: number) {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });

    if (!profesion) {
      throw new HttpException(`Profesion with id ${id} not found`, 404);
    }

    await this.profesionRespository.update(
      {
        idProfesion: id,
      },
      {
        estado: false,
      },
    );

    return {
      message: `Profesion with id ${id} has been deactivated successfully`,
      status: true,
    };
  }
}
