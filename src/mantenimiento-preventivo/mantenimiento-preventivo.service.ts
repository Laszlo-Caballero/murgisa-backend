import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateMantenimientoPreventivoDto } from './dto/create-mantenimiento-preventivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MantenimientoPreventivo } from './entities/mantenimiento-preventivo.entity';
import { TipoMantenimiento } from 'src/tipo-mantenimiento/entities/tipo-mantenimiento.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';
import { Personal } from 'src/personal/entities/personal.entity';
import { Horario } from 'src/utils/entities/horario.entity';
import { Log } from 'src/home/entities/log.entity';
@Injectable()
export class MantenimientoPreventivoService {

   constructor(
      @InjectRepository(MantenimientoPreventivo)
      private mantenimientoPreventivoRepository: Repository<MantenimientoPreventivo>,
      @InjectRepository(Personal)
      private personalRepository: Repository<Personal>,
      @InjectRepository(Recurso)
      private recursoRepository: Repository<Recurso>,
       @InjectRepository(Horario)
      private horarioRepository: Repository<Horario>,
      @InjectRepository(TipoMantenimiento)
      private tipoMantenimientoRepository: Repository<TipoMantenimiento>,
      @InjectRepository(Log)
      private logRepository: Repository<Log>,
    ) {}
  
  async create(
     createMantenimientoPreventivoDto: CreateMantenimientoPreventivoDto,
      ) {
        const { tipoIds, recursoId, personalId, horarioId, fechaMantenimiento, prioridad } =
          createMantenimientoPreventivoDto;
    
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

        const horario = await this.horarioRepository.findOne({
          where: { idhorario: horarioId },
        });
    
        if (!horario) {
          throw new HttpException(`Horario with ID ${horarioId} not found`, 404);
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
        const parseData = new Date(fechaMantenimiento);
    
        const mantenimientoPreventivo =
          this.mantenimientoPreventivoRepository.create({
            tipo: tipos,
            recurso,
            personal,
            horario,
            fechaMantenimiento: parseData,
            prioridad,
          });
    
        await this.mantenimientoPreventivoRepository.save(mantenimientoPreventivo);
    
        await this.logRepository.save({
          tipo: 'Mantenimiento Preventivo',
          mensaje: `Se ha creado un nuevo mantenimiento preventivo para la Maquinaria ${mantenimientoPreventivo.recurso.nombre}`,
        });
    
        const mantenimientos = await this.mantenimientoPreventivoRepository.find({
          relations: ['tipo', 'recurso', 'personal','horario'],
        });
    
        return {
          message: 'Mantenimiento preventivo creado exitosamente',
          status: 201,
          data: mantenimientos,
        };
      }

  async findAll() {
  const mantenimientoPreventivo =
        await this.mantenimientoPreventivoRepository.find({
          relations: ['tipo', 'recurso', 'personal', 'horario'],
        });

      return {
        message: 'Lista de mantenimientos preventivos',
        status: 200,
        data: mantenimientoPreventivo,
      };
  }

   async findOne(id: number) {
    const mantenimientoPreventivo =
      await this.mantenimientoPreventivoRepository.findOne({
        where: { mantenimientoPreventivoId: id },
        relations: ['tipo', 'recurso', 'personal','horario'],
      });

    if (!mantenimientoPreventivo) {
      throw new HttpException(
        `Mantenimiento Preventivo with ID ${id} not found`,
        404,
      );
    }

    return {
      message: 'Mantenimiento Preventivo encontrado',
      status: 200,
      data: mantenimientoPreventivo,
    };
  }

  async remove(id: number) {
    const mantenimientoPreventivo =
      await this.mantenimientoPreventivoRepository.findOne({
        where: { mantenimientoPreventivoId: id },
        relations: ['recurso'],
      });

    if (!mantenimientoPreventivo) {
      throw new HttpException(
        `Mantenimiento Preventivo with ID ${id} not found`,
        404,
      );
    }
    await this.mantenimientoPreventivoRepository.update(
      {
        mantenimientoPreventivoId: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Mantenimiento Preventivo',
      mensaje: `Se ha desactivado el mantenimiento preventivo para la Maquinaria ${mantenimientoPreventivo.recurso.nombre}`,
    });

    const mantenimientos = await this.mantenimientoPreventivoRepository.find({
      relations: ['tipo', 'recurso', 'personal', 'horario'],
    });

    return {
      message: 'Mantenimientos Preventivos encontrados',
      status: 200,
      data: mantenimientos,
    };
  }
}


