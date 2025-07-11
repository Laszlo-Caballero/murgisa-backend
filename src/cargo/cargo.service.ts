import { HttpException, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRespository: Repository<Cargo>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(createCargoDto: CreateCargoDto) {
    const newCargo = this.cargoRespository.create(createCargoDto);

    await this.cargoRespository.save(newCargo);

    await this.logRepository.save({
      tipo: 'Cargo',
      mensaje: `Nuevo Cargo ${newCargo.cargo} creado con exito`,
    });

    const cargos = await this.cargoRespository.find();

    return {
      message: 'Cargo created successfully',
      status: 201,
      data: cargos,
    };
  }

  async findAll() {
    // esto se cambiara
    const cargos = await this.cargoRespository
      .createQueryBuilder('cargo')
      .loadRelationCountAndMap('cargo.totalUsuario', 'cargo.usuario')
      .getMany();
    const countCargos = await this.cargoRespository.count();
    const countCargosActivos = await this.cargoRespository.countBy({
      estado: true,
    });
    const usuarios = await this.authRepository.count();

    return {
    message: 'Cargo retrieved successfully',
    status: 200,
    data:{
      cargos,
      total: countCargos,
      activos: countCargosActivos,
      usuarios,}
    };
  }

  async findOne(id: number) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });

    if (!cargo) {
      throw new HttpException(
        {
          message: `Cargo with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    return {
      message: 'Cargo retrieved successfully',
      status: 200,
      data: cargo,
    };
  }

  async update(id: number, UpdateCargoDto: UpdateCargoDto) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });
    if (!cargo) {
      throw new HttpException(
        {
          message: `Cargo with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.cargoRespository.update(
      {
        idCargo: id,
      },
      {
        ...UpdateCargoDto,
      },
    );

    await this.logRepository.save({
      tipo: 'Cargo',
      mensaje: `Cargo ${cargo.cargo} actualizado con exito`,
    });

    const cargos = await this.cargoRespository.find();

    return {
      message: `Cargo with id ${id} has been updated successfully`,
      status: 201,
      data: cargos,
    };
  }

  async remove(id: number) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });

    if (!cargo) {
      throw new HttpException(
        {
          message: `Cargo with id ${id} not found`,
          status: 404,
          data: null,
        },
        404,
      );
    }

    await this.cargoRespository.update(
      {
        idCargo: id,
      },
      {
        estado: false,
      },
    );

    await this.logRepository.save({
      tipo: 'Cargo',
      mensaje: `Cargo ${cargo.cargo} desactivada con exito`,
    });


    const cargos = await this.cargoRespository.find();

    return {
      message: `Cargo with id ${id} has been  deactivated successfully`,
      status: 201,
      data: cargos,
    };
  }
}
