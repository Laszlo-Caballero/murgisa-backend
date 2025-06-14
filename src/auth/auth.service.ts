import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Cargo } from 'src/cargo/entities/cargo.entity';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { cargoId } = createAuthDto;
    const cargo = await this.cargoRepository.findOneBy({ idCargo: cargoId });

    if (!cargo) {
      return new HttpException('No se encontró el cargo', 404);
    }

    const contraseñaEncriptada = await hash(createAuthDto.contrasena, 10);

    const usuario = this.authRepository.create({
      usuario: createAuthDto.usuario,
      contrasena: contraseñaEncriptada,
      cargo,
    });

    const saveUser = await this.authRepository.save(usuario);

    const payload = {
      idUsuario: saveUser.idUsuario,
      usuario: saveUser.usuario,
      cargo: saveUser.cargo.idCargo,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario creado con éxito',
      usuario: saveUser,
      token: token,
    };
  }

  async login(data: LoginDto) {
    const { usuario, contrasena } = data;

    const user = await this.authRepository.findOne({
      where: { usuario: usuario },
      relations: ['cargo'],
    });

    if (!user) {
      return new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordValid = await compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      return new HttpException('Contraseña incorrecta', 401);
    }
    const payload = {
      idUsuario: user.idUsuario,
      usuario: user.usuario,
      cargo: user.cargo.idCargo,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      usuario: user,
      token: token,
    };
  }
}
