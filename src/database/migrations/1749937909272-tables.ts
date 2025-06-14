import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749937909272 implements MigrationInterface {
    name = 'Tables1749937909272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cargo" ("idCargo" int NOT NULL IDENTITY(1,1), "cargo" nvarchar(50) NOT NULL, "descripcion" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_53cdd8108efe92f404b51ca3684" DEFAULT 1, CONSTRAINT "PK_c27343ed0608957d13c7e341a62" PRIMARY KEY ("idCargo"))`);
        await queryRunner.query(`CREATE TABLE "Usuario" ("idUsuario" int NOT NULL IDENTITY(1,1), "usuario" nvarchar(255) NOT NULL, "contrasena" nvarchar(255) NOT NULL, "correo" nvarchar(255) NOT NULL CONSTRAINT "DF_631bf87f4acdcb87c6ff8648c37" DEFAULT '', "personalIdPersonal" int, CONSTRAINT "PK_b7eceb38fdbcd4d575b20676d26" PRIMARY KEY ("idUsuario"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_35705b4865b23683b9ee81c938" ON "Usuario" ("personalIdPersonal") WHERE "personalIdPersonal" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "profesion" ("idProfesion" int NOT NULL IDENTITY(1,1), "titulo" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_21cf52ba824fdb7a36747980335" DEFAULT 1, CONSTRAINT "PK_95f3c6f1bc49b7d46f0516779fa" PRIMARY KEY ("idProfesion"))`);
        await queryRunner.query(`CREATE TABLE "departamento" ("idDepartamento" int NOT NULL IDENTITY(1,1), "titulo" nvarchar(50) NOT NULL CONSTRAINT "DF_84eb53d18e09792d6d555a31771" DEFAULT '', "descripcion" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_717802580eed056abf5d99582d1" DEFAULT 1, "presupuesto" float NOT NULL CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e" DEFAULT 0, CONSTRAINT "PK_c900795eedd4ca909e8d2c48407" PRIMARY KEY ("idDepartamento"))`);
        await queryRunner.query(`CREATE TABLE "personal" ("idPersonal" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "apellido_paterno" nvarchar(100) NOT NULL, "apellido_materno" nvarchar(100) NOT NULL, "sueldo" float NOT NULL, "numeroDocumento" nvarchar(8) NOT NULL, "telefono" nvarchar(9) NOT NULL, "estado" bit NOT NULL, "fechaIngreso" datetime NOT NULL CONSTRAINT "DF_0b782c697b07c5c8b8783a3c896" DEFAULT getdate(), "cargoIdCargo" int, "usuarioIdUsuario" int, "profesionIdProfesion" int, "departamentoIdDepartamento" int, CONSTRAINT "PK_e135d727513b330955be504d1b3" PRIMARY KEY ("idPersonal"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_d1a22e268964da8bfba0c06cf7" ON "personal" ("usuarioIdUsuario") WHERE "usuarioIdUsuario" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "asignacion_personal" ("idAsignacionPersonal" int NOT NULL IDENTITY(1,1), "costo" float NOT NULL, "estado" bit NOT NULL, "personalIdPersonal" int, "ventaIdVenta" int, CONSTRAINT "PK_300cec76d1ea1f4686b459f86e2" PRIMARY KEY ("idAsignacionPersonal"))`);
        await queryRunner.query(`CREATE TABLE "venta" ("idVenta" int NOT NULL IDENTITY(1,1), "fechaInicioServicio" datetime NOT NULL, "fechaFFinServicio" datetime NOT NULL, "fechaVenta" datetime NOT NULL CONSTRAINT "DF_0d03a92a0634088ee5dd741187e" DEFAULT GETDATE(), "estado" bit NOT NULL CONSTRAINT "DF_4644b5e0c32d33548528e87cf65" DEFAULT 1, CONSTRAINT "PK_7fe75ea53ff542d6f3bda936478" PRIMARY KEY ("idVenta"))`);
        await queryRunner.query(`CREATE TABLE "forma_pago" ("idFormaPago" int NOT NULL IDENTITY(1,1), "tipo" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL CONSTRAINT "DF_819b148a0f8828dc18f1a20e465" DEFAULT '', "comision" float NOT NULL CONSTRAINT "DF_16e31161e5148e4075312f4dd22" DEFAULT 0, "estado" bit NOT NULL CONSTRAINT "DF_b3dd7dd25ce80ebd8e3ee9f96f2" DEFAULT 1, "registeredAt" datetime NOT NULL CONSTRAINT "DF_0bb3fda619584473954752b7366" DEFAULT getdate(), CONSTRAINT "PK_5b0a473a761ac8106dad5447c28" PRIMARY KEY ("idFormaPago"))`);
        await queryRunner.query(`CREATE TABLE "servicio" ("idServicio" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_79cc1a181994fa3949b79b0c231" DEFAULT 1, "precio" float NOT NULL, CONSTRAINT "PK_573b59d61c91e2582ad47370294" PRIMARY KEY ("idServicio"))`);
        await queryRunner.query(`CREATE TABLE "ciudad" ("idCiudad" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, CONSTRAINT "PK_19adc99d9c1dff5abeb5203948c" PRIMARY KEY ("idCiudad"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("idCliente" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "dni" char(8) NOT NULL, "correo" nvarchar(255) NOT NULL, "telefono" varchar(50) NOT NULL, "razonSocial" varchar(100) NOT NULL CONSTRAINT "DF_6525fb3b1a2b81ecf2e7bf92ab2" DEFAULT '', "direccion" nvarchar(255) NOT NULL, "fechaNacimiento" datetime NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_9dc2bb9aea9e2ae54d910cc70fe" DEFAULT 1, "ciudadIdCiudad" int, CONSTRAINT "PK_f7385a8fade4ae61cfeca8e691a" PRIMARY KEY ("idCliente"))`);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_35705b4865b23683b9ee81c9382" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_221f56fd0ec88f85014e20baf9e" FOREIGN KEY ("cargoIdCargo") REFERENCES "cargo"("idCargo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_d1a22e268964da8bfba0c06cf73" FOREIGN KEY ("usuarioIdUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_17510e15574ac056006f25aa893" FOREIGN KEY ("profesionIdProfesion") REFERENCES "profesion"("idProfesion") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_7cf1e9b5c85f79a04e22d7c57d2" FOREIGN KEY ("departamentoIdDepartamento") REFERENCES "departamento"("idDepartamento") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" ADD CONSTRAINT "FK_4b9c00cf730d1f4c269e90d0512" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" ADD CONSTRAINT "FK_f74240788da8fc38bf2e113430b" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_8d56e48a3a197ba3c26990a8750" FOREIGN KEY ("ciudadIdCiudad") REFERENCES "ciudad"("idCiudad") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_8d56e48a3a197ba3c26990a8750"`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" DROP CONSTRAINT "FK_f74240788da8fc38bf2e113430b"`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" DROP CONSTRAINT "FK_4b9c00cf730d1f4c269e90d0512"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_7cf1e9b5c85f79a04e22d7c57d2"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_17510e15574ac056006f25aa893"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_d1a22e268964da8bfba0c06cf73"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_221f56fd0ec88f85014e20baf9e"`);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_35705b4865b23683b9ee81c9382"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "ciudad"`);
        await queryRunner.query(`DROP TABLE "servicio"`);
        await queryRunner.query(`DROP TABLE "forma_pago"`);
        await queryRunner.query(`DROP TABLE "venta"`);
        await queryRunner.query(`DROP TABLE "asignacion_personal"`);
        await queryRunner.query(`DROP INDEX "REL_d1a22e268964da8bfba0c06cf7" ON "personal"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`DROP TABLE "departamento"`);
        await queryRunner.query(`DROP TABLE "profesion"`);
        await queryRunner.query(`DROP INDEX "REL_35705b4865b23683b9ee81c938" ON "Usuario"`);
        await queryRunner.query(`DROP TABLE "Usuario"`);
        await queryRunner.query(`DROP TABLE "cargo"`);
    }

}
