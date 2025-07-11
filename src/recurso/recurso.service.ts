import { HttpException, Injectable } from '@nestjs/common';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';
import { Recurso } from './entities/recurso.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import { TipoRecurso } from 'src/tipo-recurso/entities/tipo-recurso.entity';
import { Disponibilidad } from 'src/utils/entities/disponibilidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from 'src/home/entities/log.entity';


@Injectable()
export class RecursoService {
    constructor(
      @InjectRepository(Recurso)
      private readonly recursoRepository: Repository<Recurso>,
      @InjectRepository(Proveedor)
      private readonly proveedorRepository: Repository<Proveedor>,
      @InjectRepository(TipoRecurso)
      private readonly tipoRepository: Repository<TipoRecurso>,
      @InjectRepository(Disponibilidad)
      private readonly disponibilidadRepository: Repository<Disponibilidad>,
      @InjectRepository(Log) private logRepository: Repository<Log>,
      
    ) {}


  async create(createRecursoDto: CreateRecursoDto) {
    const { tipoId, proveedorId, disponibilidadId, ...recursoData } =
    createRecursoDto;

    const tipoRecurso = await this.tipoRepository.findOneBy({
      idTipoRecurso: tipoId,
    });
    if (!tipoRecurso) {
      throw new HttpException(
        'No se encontró el tipo de recurso con el ID proporcionado',
        404,
      );
    }

    const proveedor = await this.proveedorRepository.findOneBy({ idProovedor: proveedorId });

    if (!proveedor) {
      throw new HttpException(
        'No se encontró el proveedor con el ID proporcionado',
        404,
      );
    }

    const disponibilidad = await this.disponibilidadRepository.findOneBy({
      disponibilidadId: disponibilidadId,
    });
    if (!disponibilidad) {
      throw new HttpException(
        'No se encontró la disponibilidad con el ID proporcionado',
        404,
      );
    }

    const newRecurso = this.recursoRepository.create({
      ...recursoData,
      tipoRecurso,
      proveedor,
      disponibilidad,
    });

    const log = this.logRepository.create({
      mensaje: `Nuevo recurso ${newRecurso.nombre} creado con exito`,
      tipo: 'Recurso',
    });
    await this.logRepository.save(log);

    const recursos = await this.recursoRepository.find({
      relations: ['tipoRecurso', 'proveedor', 'disponibilidad'],
    });

    return {
      message: 'Recurso created successfully',
      status: 200,
      data: recursos,
    };
  }

  async findAll() {
    const recursos = await this.recursoRepository.find({
      relations: ['tipoRecurso', 'proveedor', 'disponibilidad'],
    });
    return recursos;
  }

  findOne(id: number) {
    const recurso = this.recursoRepository.findOne({
      where: { idRecurso: id },
      relations: ['tipoRecurso', 'proveedor', 'disponibilidad'],
    });

    if (!recurso) {
      throw new HttpException('Recurso not found', 404);
    }

    return recurso;
  }

  async update(id: number, updateRecursoDto: UpdateRecursoDto) {
    const { tipoId, proveedorId, disponibilidadId, ...recursoData } =
    updateRecursoDto;

    const recurso = await this.recursoRepository.findOneBy({
      idRecurso: id,
    });
    if (!recurso) {
      throw new HttpException('Recurso not found', 404);
    }

    const tipoRecurso = await this.tipoRepository.findOneBy({
      idTipoRecurso: tipoId,
    });
    if (!tipoRecurso) {
      throw new HttpException('Tipo de recurso not found', 404);
    }

    const proveedor = await this.proveedorRepository.findOneBy({ idProovedor: proveedorId });
    if (!proveedor) {
      throw new HttpException('Proveedor not found', 404);
    }

    const disponibilidad = await this.disponibilidadRepository.findOneBy({
      disponibilidadId: disponibilidadId,
    });
    if (!disponibilidad) {
      throw new HttpException('Disponibilidad not found', 404);
    }

    await this.recursoRepository.update(id, {
      ...recursoData,
      tipoRecurso,
      proveedor,
      disponibilidad,
    });

    return {
      message: 'Recurso updated successfully',
      status: true,
    };
  }

  async remove(id: number) {
    const recurso = await this.recursoRepository.findOneBy({
      idRecurso: id,
    });
    if (!recurso) {
      throw new HttpException('Recurso not found', 404);
    }

    await this.recursoRepository.update(id, { estado: false });

    return {
      message: 'Recurso removed successfully',
      status: true,
    };
  }
}
