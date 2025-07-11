import { HttpException, Injectable } from '@nestjs/common';
import { CreateMantenimientoCorrectivoDto } from './dto/create-mantenimiento-correctivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MantenimientoCorrectivo } from './entities/mantenimiento-correctivo.entity';
import { Repository } from 'typeorm';
import { Personal } from 'src/personal/entities/personal.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { TipoMantenimiento } from 'src/tipo-mantenimiento/entities/tipo-mantenimiento.entity';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class MantenimientoCorrectivoService {
  constructor(
    @InjectRepository(MantenimientoCorrectivo)
    private mantenimientoCorrectivoRepository: Repository<MantenimientoCorrectivo>,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
    @InjectRepository(TipoMantenimiento)
    private tipoMantenimientoRepository: Repository<TipoMantenimiento>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(
    createMantenimientoCorrectivoDto: CreateMantenimientoCorrectivoDto,
  ) {
    const { tipoIds, recursoId, personalId, fechaInicio, precio } =
      createMantenimientoCorrectivoDto;

    const recurso = await this.recursoRepository.findOne({
      where: { idRecurso: recursoId },
    });

    if (!recurso) {
      throw new HttpException(`Recurso with ID ${recursoId} not found`, 404);
    }

    const personal = await this.personalRepository.findOne({
      where: { idPersonal: personalId },
    });

    if (!personal) {
      throw new HttpException(`Personal with ID ${personalId} not found`, 404);
    }

    const tipos = await Promise.all(
      tipoIds.map(async (tipoId) => {
        const tipo = await this.tipoMantenimientoRepository.findOne({
          where: { tipoMantenimientoId: tipoId },
        });

        if (!tipo) {
          throw new HttpException(`Tipo with ID ${tipoId} not found`, 404);
        }
        return tipo;
      }),
    );
    const parseData = new Date(fechaInicio);

    const mantenimientoCorrectivo =
      this.mantenimientoCorrectivoRepository.create({
        tipo: tipos,
        recurso,
        personal,
        fechaInicio: parseData,
        precio,
      });

    await this.mantenimientoCorrectivoRepository.save(mantenimientoCorrectivo);

    await this.logRepository.save({
      tipo: 'Mantenimiento Correctivo',
      mensaje: `Se ha creado un nuevo mantenimiento correctivo para la Maquinaria ${mantenimientoCorrectivo.recurso.nombre}`,
    });

    const mantenimientos = await this.mantenimientoCorrectivoRepository.find({
      relations: ['tipo', 'recurso', 'personal'],
    });

    return {
      message: 'Mantenimiento correctivo creado exitosamente',
      status: 201,
      data: mantenimientos,
    };
  }

  async findAll() {
    const mantenimientoCorrectivo =
      await this.mantenimientoCorrectivoRepository.find({
        relations: ['tipo', 'recurso', 'personal'],
      });

    return {
      message: 'Lista de mantenimientos correctivos',
      status: 200,
      data: mantenimientoCorrectivo,
    };
  }

  async findOne(id: number) {
    const mantenimientoCorrectivo =
      await this.mantenimientoCorrectivoRepository.findOne({
        where: { mantenimientoCorrectivoId: id },
        relations: ['tipo', 'recurso', 'personal'],
      });

    if (!mantenimientoCorrectivo) {
      throw new HttpException(
        `Mantenimiento Correctivo with ID ${id} not found`,
        404,
      );
    }

    return {
      message: 'Mantenimiento Correctivo encontrado',
      status: 200,
      data: mantenimientoCorrectivo,
    };
  }

  async remove(id: number) {
    const mantenimientoCorrectivo =
      await this.mantenimientoCorrectivoRepository.findOne({
        where: { mantenimientoCorrectivoId: id },
        relations: ['recurso'],
      });

    if (!mantenimientoCorrectivo) {
      throw new HttpException(
        `Mantenimiento Correctivo with ID ${id} not found`,
        404,
      );
    }
    await this.mantenimientoCorrectivoRepository.update(
      {
        mantenimientoCorrectivoId: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Mantenimiento Correctivo',
      mensaje: `Se ha desactivado el mantenimiento correctivo para la Maquinaria ${mantenimientoCorrectivo.recurso.nombre}`,
    });

    const mantenimientos = await this.mantenimientoCorrectivoRepository.find({
      relations: ['tipo', 'recurso', 'personal'],
    });

    return {
      message: 'Mantenimientos Correctivos encontrados',
      status: 200,
      data: mantenimientos,
    };
  }
}
