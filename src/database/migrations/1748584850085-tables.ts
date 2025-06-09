import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1748584850085 implements MigrationInterface {
    name = 'Tables1748584850085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venta" ("idVenta" int NOT NULL IDENTITY(1,1), "fechaInicioServicio" datetime NOT NULL, "fechaFFinServicio" datetime NOT NULL, "fechaVenta" datetime NOT NULL CONSTRAINT "DF_0d03a92a0634088ee5dd741187e" DEFAULT GETDATE(), "estado" bit NOT NULL CONSTRAINT "DF_4644b5e0c32d33548528e87cf65" DEFAULT 1, "servicioIdServicio" int, CONSTRAINT "PK_7fe75ea53ff542d6f3bda936478" PRIMARY KEY ("idVenta"))`);
        await queryRunner.query(`ALTER TABLE "servicio" ADD CONSTRAINT "DF_79cc1a181994fa3949b79b0c231" DEFAULT 1 FOR "estado"`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_f11c076cd83371ab2945893e98b" FOREIGN KEY ("servicioIdServicio") REFERENCES "servicio"("idServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_f11c076cd83371ab2945893e98b"`);
        await queryRunner.query(`ALTER TABLE "servicio" DROP CONSTRAINT "DF_79cc1a181994fa3949b79b0c231"`);
        await queryRunner.query(`DROP TABLE "venta"`);
    }

}
