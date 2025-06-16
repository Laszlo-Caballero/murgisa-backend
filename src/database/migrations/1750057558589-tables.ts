import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1750057558589 implements MigrationInterface {
    name = 'Tables1750057558589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venta_servicios_servicio" ("ventaIdVenta" int NOT NULL, "servicioIdServicio" int NOT NULL, CONSTRAINT "PK_f75d71bed55589c35ccf5445ef1" PRIMARY KEY ("ventaIdVenta", "servicioIdServicio"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e1d3a7359520e9560fd956f1d" ON "venta_servicios_servicio" ("ventaIdVenta") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f04bf702341a36f92a4c972cc" ON "venta_servicios_servicio" ("servicioIdServicio") `);
        await queryRunner.query(`ALTER TABLE "venta_servicios_servicio" ADD CONSTRAINT "FK_2e1d3a7359520e9560fd956f1d5" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "venta_servicios_servicio" ADD CONSTRAINT "FK_5f04bf702341a36f92a4c972cc3" FOREIGN KEY ("servicioIdServicio") REFERENCES "servicio"("idServicio") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_servicios_servicio" DROP CONSTRAINT "FK_5f04bf702341a36f92a4c972cc3"`);
        await queryRunner.query(`ALTER TABLE "venta_servicios_servicio" DROP CONSTRAINT "FK_2e1d3a7359520e9560fd956f1d5"`);
        await queryRunner.query(`DROP INDEX "IDX_5f04bf702341a36f92a4c972cc" ON "venta_servicios_servicio"`);
        await queryRunner.query(`DROP INDEX "IDX_2e1d3a7359520e9560fd956f1d" ON "venta_servicios_servicio"`);
        await queryRunner.query(`DROP TABLE "venta_servicios_servicio"`);
    }

}
