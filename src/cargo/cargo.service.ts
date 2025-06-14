import { HttpException, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRespository: Repository<Cargo>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  create(createCargoDto: CreateCargoDto) {
    const newCargo = this.cargoRespository.create(createCargoDto);

    return this.cargoRespository.save(newCargo);
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
      cargos,
      total: countCargos,
      activos: countCargosActivos,
      usuarios,
    };
  }

  async findOne(id: number) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });

    if (!cargo) {
      throw new HttpException(`Cargo with id ${id} not found`, 404);
    }

    return cargo;
  }

  async update(id: number, UpdateCargoDto: UpdateCargoDto) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });
    if (!cargo) {
      throw new HttpException(`Cargo with id ${id} not found`, 404);
    }

    await this.cargoRespository.update(
      {
        idCargo: id,
      },
      {
        ...UpdateCargoDto,
      },
    );

    return {
      message: `Cargo with id ${id} has been updated successfully`,
      status: true,
    };
  }

  async remove(id: number) {
    const cargo = await this.cargoRespository.findOneBy({
      idCargo: id,
    });

    if (!cargo) {
      throw new HttpException(`Cargo with id ${id} not found`, 404);
    }

    await this.cargoRespository.update(
      {
        idCargo: id,
      },
      {
        estado: false,
      },
    );

    return {
      message: `Cargo with id ${id} has been deactivated successfully`,
      status: true,
    };
  }
}
