import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Personal } from 'src/personal/entities/personal.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { personalId } = createAuthDto;
    const personal = await this.personalRepository.findOneBy({
      idPersonal: personalId,
    });

    if (!personal) {
      return new HttpException('No se encontró el personal', 404);
    }

    const contraseñaEncriptada = await hash(createAuthDto.contrasena, 10);

    const usuario = this.authRepository.create({
      usuario: createAuthDto.usuario,
      contrasena: contraseñaEncriptada,
      personal,
    });

    const saveUser = await this.authRepository.save(usuario);

    const payload = {
      idUsuario: saveUser.idUsuario,
      usuario: saveUser.usuario,
      personalId: personal.idPersonal,
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
      relations: ['personal'],
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
      personalId: user.personal.idPersonal,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      usuario: user,
      token: token,
    };
  }
}
