import { HttpException, Injectable } from '@nestjs/common';
import { CreateTipoRecursoDto } from './dto/create-tipo-recurso.dto';
import { UpdateTipoRecursoDto } from './dto/update-tipo-recurso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoRecurso } from './entities/tipo-recurso.entity';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class TipoRecursoService {
  constructor(
    @InjectRepository(TipoRecurso)
    private tipoRecursoRepository: Repository<TipoRecurso>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(createTipoRecursoDto: CreateTipoRecursoDto) {
    const newTipoRecurso =
      this.tipoRecursoRepository.create(createTipoRecursoDto);

    await this.tipoRecursoRepository.save(newTipoRecurso);

    await this.logRepository.save({
      tipo: 'Tipo Recurso',
      mensaje: `Se ha creado un nuevo tipo de recurso: ${newTipoRecurso.nombre}`,
    });

    const tipoRecurso = await this.tipoRecursoRepository.find();

    return {
      message: 'Tipo de recurso creado exitosamente',
      data: tipoRecurso,
      status: 200,
    };
  }

  async findAll() {
    const tipoRecurso = await this.tipoRecursoRepository.find();

    return {
      message: 'Lista de tipos de recurso',
      data: tipoRecurso,
      status: 200,
    };
  }

  async findOne(id: number) {
    const tipoRecurso = await this.tipoRecursoRepository.findOneBy({
      idTipoRecurso: id,
    });

    if (!tipoRecurso) {
      throw new HttpException(
        `Tipo de recurso con ID ${id} no encontrado`,
        404,
      );
    }

    return {
      message: 'Tipo de recurso encontrado',
      data: tipoRecurso,
      status: 200,
    };
  }

  async update(id: number, updateTipoRecursoDto: UpdateTipoRecursoDto) {
    const tipoRecurso = await this.tipoRecursoRepository.findOneBy({
      idTipoRecurso: id,
    });

    if (!tipoRecurso) {
      throw new HttpException(
        `Tipo de recurso con ID ${id} no encontrado`,
        404,
      );
    }

    await this.tipoRecursoRepository.update(id, updateTipoRecursoDto);

    await this.logRepository.save({
      tipo: 'Tipo Recurso',
      mensaje: `Se ha actualizado el tipo de recurso ${tipoRecurso.nombre}`,
    });

    const tipoRecursos = await this.tipoRecursoRepository.find();

    return {
      message: 'Tipo de recurso actualizado exitosamente',
      data: tipoRecursos,
      status: 200,
    };
  }

  async remove(id: number) {
    const tipoRecurso = await this.tipoRecursoRepository.findOneBy({
      idTipoRecurso: id,
    });

    if (!tipoRecurso) {
      throw new HttpException(
        `Tipo de recurso con ID ${id} no encontrado`,
        404,
      );
    }

    await this.tipoRecursoRepository.update(id, {
      estado: false,
    });

    await this.logRepository.save({
      tipo: 'Tipo Recurso',
      mensaje: `Se ha eliminado el tipo de recurso ${tipoRecurso.nombre}`,
    });

    const tipoRecursos = await this.tipoRecursoRepository.find();

    return {
      message: 'Tipo de recurso eliminado exitosamente',
      data: tipoRecursos,
      status: 200,
    };
  }
}
