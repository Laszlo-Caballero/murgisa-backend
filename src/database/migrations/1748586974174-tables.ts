import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1748586974174 implements MigrationInterface {
    name = 'Tables1748586974174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_f11c076cd83371ab2945893e98b"`);
        await queryRunner.query(`CREATE TABLE "personal" ("idPersonal" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "apellido_parterno" nvarchar(100) NOT NULL, "apellido_materno" nvarchar(100) NOT NULL, "sueldo" float NOT NULL, "estado" bit NOT NULL, CONSTRAINT "PK_e135d727513b330955be504d1b3" PRIMARY KEY ("idPersonal"))`);
        await queryRunner.query(`CREATE TABLE "asignacion_personal" ("idAsignacionPersonal" int NOT NULL IDENTITY(1,1), "costo" float NOT NULL, "estado" bit NOT NULL, "personalIdPersonal" int, "ventaIdVenta" int, CONSTRAINT "PK_300cec76d1ea1f4686b459f86e2" PRIMARY KEY ("idAsignacionPersonal"))`);
        await queryRunner.query(`ALTER TABLE "venta" DROP COLUMN "servicioIdServicio"`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" ADD CONSTRAINT "FK_4b9c00cf730d1f4c269e90d0512" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" ADD CONSTRAINT "FK_f74240788da8fc38bf2e113430b" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asignacion_personal" DROP CONSTRAINT "FK_f74240788da8fc38bf2e113430b"`);
        await queryRunner.query(`ALTER TABLE "asignacion_personal" DROP CONSTRAINT "FK_4b9c00cf730d1f4c269e90d0512"`);
        await queryRunner.query(`ALTER TABLE "venta" ADD "servicioIdServicio" int`);
        await queryRunner.query(`DROP TABLE "asignacion_personal"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_f11c076cd83371ab2945893e98b" FOREIGN KEY ("servicioIdServicio") REFERENCES "servicio"("idServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
