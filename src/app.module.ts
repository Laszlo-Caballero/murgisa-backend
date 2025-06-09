import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioModule } from './servicio/servicio.module';
import { VentaModule } from './venta/venta.module';
import { PersonalModule } from './personal/personal.module';
import { ProfesionModule } from './profesion/profesion.module';

@Module({
  imports: [
    ClienteModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    ServicioModule,
    VentaModule,
    PersonalModule,
    ProfesionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
