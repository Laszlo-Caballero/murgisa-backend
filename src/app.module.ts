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
import { DepartamentoModule } from './departamento/departamento.module';
import { CargoModule } from './cargo/cargo.module';
import { FormaPagoModule } from './forma-pago/forma-pago.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NotaSalidaModule } from './nota-salida/nota-salida.module';
import { RecursoModule } from './recurso/recurso.module';
import { TipoRecursoModule } from './tipo-recurso/tipo-recurso.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { MantenimientoPreventivoModule } from './mantenimiento-preventivo/mantenimiento-preventivo.module';
import { UtilsModule } from './utils/utils.module';
import { TipoMantenimientoModule } from './tipo-mantenimiento/tipo-mantenimiento.module';
import { MantenimientoCorrectivoModule } from './mantenimiento-correctivo/mantenimiento-correctivo.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { NotaEntradaModule } from './nota-entrada/nota-entrada.module';

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
        encrypt: process.env.ENCRYPT === 'true',
        trustServerCertificate: true,
      },
    }),

    ServicioModule,
    VentaModule,
    PersonalModule,
    ProfesionModule,
    DepartamentoModule,
    CargoModule,
    FormaPagoModule,
    AuthModule,
    HomeModule,
    NotaSalidaModule,
    RecursoModule,
    TipoRecursoModule,
    ProveedorModule,
    MantenimientoPreventivoModule,
    UtilsModule,
    MantenimientoCorrectivoModule,
    TipoMantenimientoModule,
    TipoServicioModule,
    NotaEntradaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
