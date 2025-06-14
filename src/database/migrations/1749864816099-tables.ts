import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749864816099 implements MigrationInterface {
    name = 'Tables1749864816099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forma_pago" ADD "descripcion" nvarchar(255) NOT NULL CONSTRAINT "DF_819b148a0f8828dc18f1a20e465" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "forma_pago" ADD "registeredAt" datetime NOT NULL CONSTRAINT "DF_0bb3fda619584473954752b7366" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP CONSTRAINT "DF_0bb3fda619584473954752b7366"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP COLUMN "registeredAt"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP CONSTRAINT "DF_819b148a0f8828dc18f1a20e465"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP COLUMN "descripcion"`);
    }

}
