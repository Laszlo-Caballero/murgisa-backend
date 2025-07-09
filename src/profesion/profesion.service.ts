import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from './entities/profesion.entity';
import { Repository } from 'typeorm';
import { Response } from 'src/interface/type';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class ProfesionService {
  constructor(
    @InjectRepository(Profesion)
    private profesionRespository: Repository<Profesion>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(
    createProfesionDto: CreateProfesionDto,
  ): Promise<Response<Profesion[]>> {
    const newProfesion = this.profesionRespository.create(createProfesionDto);

    await this.profesionRespository.save(newProfesion);
    await this.logRepository.save({
      tipo: 'Profesion',
      mensaje: `Nueva Profesion ${newProfesion.titulo} creada con exito`,
    });

    const profesiones = await this.profesionRespository.find();

    return {
      message: 'Profesion created successfully',
      status: 201,
      data: profesiones,
    };
  }

  async findAll() {
    const [profesiones, count] = await this.profesionRespository.findAndCount();
    const profesionesActivas = await this.profesionRespository.countBy({
      estado: true,
    });
    const queryBuilder = await this.profesionRespository
      .createQueryBuilder('profesion')
      .loadRelationCountAndMap(
        'profesion.personalCount',
        'profesion.personal',
        'personal',
      )
      .where('', { estado: true })
      .getOne();

    return {
      message: 'Professions retrieved successfully',
      status: 200,
      data: {
        profesiones,
        total: count,
        profesionesActivas,
      },
    };
  }

  async findOne(id: number): Promise<Response<Profesion>> {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });

    if (!profesion) {
      throw new HttpException(
        {
          message: `Profesion with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    return {
      message: 'Profesion retrieved successfully',
      status: 200,
      data: profesion,
    };
  }

  async update(
    id: number,
    updateProfesionDto: UpdateProfesionDto,
  ): Promise<Response<Profesion[]>> {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });
    if (!profesion) {
      throw new HttpException(
        {
          message: `Profesion with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.profesionRespository.update(
      {
        idProfesion: id,
      },
      {
        ...updateProfesionDto,
      },
    );
    await this.logRepository.save({
      tipo: 'Profesion',
      mensaje: `Profesion ${profesion.titulo} actualizada con exito`,
    });

    const profesiones = await this.profesionRespository.find();

    return {
      message: `Profesion with id ${id} has been updated successfully`,
      status: 201,
      data: profesiones,
    };
  }

  async remove(id: number): Promise<Response<Profesion[]>> {
    const profesion = await this.profesionRespository.findOneBy({
      idProfesion: id,
    });

    if (!profesion) {
      throw new HttpException(
        {
          message: `Profesion with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.profesionRespository.update(
      {
        idProfesion: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Profesion',
      mensaje: `Profesion ${profesion.titulo} desactivada con exito`,
    });

    const profesiones = await this.profesionRespository.find();

    return {
      message: `Profesion with id ${id} has been deactivated successfully`,
      status: 200,
      data: profesiones,
    };
  }
}
