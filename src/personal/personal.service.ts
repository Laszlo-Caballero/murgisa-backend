import { HttpException, Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Repository } from 'typeorm';
import { Cargo } from 'src/cargo/entities/cargo.entity';
import { Profesion } from 'src/profesion/entities/profesion.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Profesion)
    private readonly profesionRepository: Repository<Profesion>,
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async create(createPersonalDto: CreatePersonalDto) {
    const { cargoId, profesionId, departamentoId, ...personalData } =
      createPersonalDto;

    const departamento = await this.departamentoRepository.findOneBy({
      idDepartamento: departamentoId,
    });
    if (!departamento) {
      throw new HttpException(
        'No se encontró el departamento con el ID proporcionado',
        404,
      );
    }

    const cargo = await this.cargoRepository.findOneBy({ idCargo: cargoId });

    if (!cargo) {
      throw new HttpException(
        'No se encontró el cargo con el ID proporcionado',
        404,
      );
    }

    const profesion = await this.profesionRepository.findOneBy({
      idProfesion: profesionId,
    });
    if (!profesion) {
      throw new HttpException(
        'No se encontró la profesión con el ID proporcionado',
        404,
      );
    }

    const newPersonal = this.personalRepository.create({
      ...personalData,
      cargo,
      profesion,
      departamento,
    });

    await this.personalRepository.save(newPersonal);

    const logEntry = this.logRepository.create({
      tipo: 'Personal',
      mensaje: `Nuevo personal creado: ${newPersonal.nombre} ${newPersonal.apellido_paterno}`,
    });

    await this.logRepository.save(logEntry);

    const personal = await this.personalRepository.find({
      relations: ['cargo', 'profesion', 'usuario', 'departamento'],
    });

    return {
      message: 'Personal created successfully',
      status: 201,
      data: personal,
    };
  }

  async findAll() {
    const personal = await this.personalRepository.find({
      relations: ['cargo', 'profesion', 'usuario', 'departamento'],
    });
    return {
      message: 'Personal retrieved successfully',
      status: 200,
      data: personal,
    };
  }

  async findOne(id: number) {
    const personal = await this.personalRepository.findOne({
      where: { idPersonal: id },
      relations: ['cargo', 'profesion', 'usuario', 'departamento'],
    });

    if (!personal) {
      throw new HttpException('Personal not found', 404);
    }

    return {
      message: 'Personal retrieved successfully',
      status: 200,
      data: personal,
    };
  }

  async update(id: number, updatePersonalDto: UpdatePersonalDto) {
    const { cargoId, profesionId, departamentoId, ...personalData } =
      updatePersonalDto;
    const personal = await this.personalRepository.findOneBy({
      idPersonal: id,
    });
    if (!personal) {
      throw new HttpException('Personal not found', 404);
    }

    const departamento = await this.departamentoRepository.findOneBy({
      idDepartamento: departamentoId,
    });
    if (!departamento) {
      throw new HttpException('Departamento not found', 404);
    }

    const cargo = await this.cargoRepository.findOneBy({ idCargo: cargoId });
    if (!cargo) {
      throw new HttpException('Cargo not found', 404);
    }
    const profesion = await this.profesionRepository.findOneBy({
      idProfesion: profesionId,
    });
    if (!profesion) {
      throw new HttpException('Profesion not found', 404);
    }

    await this.personalRepository.update(id, {
      ...personalData,
      cargo,
      profesion,
      departamento,
    });

    await this.logRepository.save({
      tipo: 'Personal',
      mensaje: `Personal actualizado: ${personal.nombre} ${personal.apellido_paterno}`,
    });

    const personales = await this.personalRepository.find({
      relations: ['cargo', 'profesion', 'usuario', 'departamento'],
    });

    return {
      message: 'Personal updated successfully',
      status: 200,
      data: personales,
    };
  }

  async remove(id: number) {
    const personal = await this.personalRepository.findOneBy({
      idPersonal: id,
    });
    if (!personal) {
      throw new HttpException('Personal not found', 404);
    }

    await this.personalRepository.update(id, { estado: false });

    await this.logRepository.save({
      tipo: 'Personal',
      mensaje: `El Personal ${personal.nombre} ${personal.apellido_paterno} fue desactivado con éxito`,
    });

    const personales = await this.personalRepository.find({
      relations: ['cargo', 'profesion', 'usuario', 'departamento'],
    });

    return {
      message: 'Personal removed successfully',
      status: 200,
      data: personales,
    };
  }
}
