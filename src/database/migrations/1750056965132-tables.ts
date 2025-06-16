import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1750056965132 implements MigrationInterface {
    name = 'Tables1750056965132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pago_servicio" ("idPagoServicio" int NOT NULL IDENTITY(1,1), "fecha" datetime NOT NULL CONSTRAINT "DF_e5f8a56df94fab19e7b9bce5181" DEFAULT getdate(), "estado" bit NOT NULL CONSTRAINT "DF_0add085741a8f44454d214212b5" DEFAULT 1, "ventaIdVenta" int, "formaPagoIdFormaPago" int, CONSTRAINT "PK_8b42d5bb63693e562fa401f9047" PRIMARY KEY ("idPagoServicio"))`);
        await queryRunner.query(`CREATE TABLE "nota_salida" ("idNotaSalida" int NOT NULL IDENTITY(1,1), "ventaIdVenta" int, CONSTRAINT "PK_c1f348e8c41c925dddc668e9732" PRIMARY KEY ("idNotaSalida"))`);
        await queryRunner.query(`ALTER TABLE "forma_pago" ADD "pagosIdPagoServicio" int`);
        await queryRunner.query(`ALTER TABLE "venta" ADD "clienteIdCliente" int`);
        await queryRunner.query(`ALTER TABLE "venta" ADD "pagosIdPagoServicio" int`);
        await queryRunner.query(`ALTER TABLE "forma_pago" ADD CONSTRAINT "FK_2d1cb160fab1c33b886eddb0000" FOREIGN KEY ("pagosIdPagoServicio") REFERENCES "pago_servicio"("idPagoServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pago_servicio" ADD CONSTRAINT "FK_d7fefe92096a9a18250d7b619c9" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pago_servicio" ADD CONSTRAINT "FK_e95f952a88963be632dde7286cb" FOREIGN KEY ("formaPagoIdFormaPago") REFERENCES "forma_pago"("idFormaPago") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota_salida" ADD CONSTRAINT "FK_5ba70b5dae5d07d02165f44d021" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_e6b9758a6bb85dbb2462c507676" FOREIGN KEY ("clienteIdCliente") REFERENCES "cliente"("idCliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_26bfe71be0a30e89f87ba0975f5" FOREIGN KEY ("pagosIdPagoServicio") REFERENCES "pago_servicio"("idPagoServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_26bfe71be0a30e89f87ba0975f5"`);
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_e6b9758a6bb85dbb2462c507676"`);
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP CONSTRAINT "FK_5ba70b5dae5d07d02165f44d021"`);
        await queryRunner.query(`ALTER TABLE "pago_servicio" DROP CONSTRAINT "FK_e95f952a88963be632dde7286cb"`);
        await queryRunner.query(`ALTER TABLE "pago_servicio" DROP CONSTRAINT "FK_d7fefe92096a9a18250d7b619c9"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP CONSTRAINT "FK_2d1cb160fab1c33b886eddb0000"`);
        await queryRunner.query(`ALTER TABLE "venta" DROP COLUMN "pagosIdPagoServicio"`);
        await queryRunner.query(`ALTER TABLE "venta" DROP COLUMN "clienteIdCliente"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP COLUMN "pagosIdPagoServicio"`);
        await queryRunner.query(`DROP TABLE "nota_salida"`);
        await queryRunner.query(`DROP TABLE "pago_servicio"`);
    }

}
