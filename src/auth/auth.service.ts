import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Personal } from 'src/personal/entities/personal.entity';
import { Log } from 'src/home/entities/log.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { personalId } = createAuthDto;
    const personal = await this.personalRepository.findOne({
      where: {
        idPersonal: personalId,
      },
      relations: ['usuario'],
    });

    if (!personal) {
      throw new HttpException('No se encontró el personal', 404);
    }

    if (personal.usuario) {
      throw new HttpException('El personal ya tiene un usuario asociado', 400);
    }

    const contraseñaEncriptada = await hash(createAuthDto.contrasena, 10);

    const usuario = this.authRepository.create({
      usuario: createAuthDto.usuario,
      contrasena: contraseñaEncriptada,
      correo: createAuthDto.correo,
      personal,
    });

    const saveUser = await this.authRepository.save(usuario);

    await this.personalRepository.update(
      { idPersonal: personal.idPersonal },
      { estado: true, usuario: saveUser },
    );

    const payload = {
      idUsuario: saveUser.idUsuario,
      usuario: saveUser.usuario,
      personalId: personal.idPersonal,
    };

    const token = this.jwtService.sign(payload);

    await this.logRepository.save({
      tipo: 'Usuario',
      mensaje: `Se ha creado un Usuario ${saveUser.usuario}`,
    });

    return {
      message: 'Usuario creado con éxito',
      usuario: saveUser,
      token: token,
    };
  }

  async login(data: LoginDto) {
    const { correo, contrasena } = data;

    const user = await this.authRepository.findOne({
      where: { correo: correo },
      relations: ['personal'],
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordValid = await compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }
    const payload = {
      idUsuario: user.idUsuario,
      usuario: user.usuario,
      personalId: user.personal.idPersonal,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      usuario: {
        ...user,
        token,
      },
    };
  }

  async validateUser() {
    return { message: 'Usuario validado correctamente', status: true };
  }
}
