import { HttpException, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CargoService {

  constructor(
    @InjectRepository(Cargo)
    private cargoRespository: Repository<Cargo>,
  ) {}

  create(createCargoDto: CreateCargoDto) {
    const newCargo = this.cargoRespository.create(createCargoDto);

    return this.cargoRespository.save(newCargo);
  }

  async findAll() {
    const cargos = await this.cargoRespository.find();
    return cargos;
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
