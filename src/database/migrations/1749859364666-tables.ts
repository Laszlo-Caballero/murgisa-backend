import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749859364666 implements MigrationInterface {
    name = 'Tables1749859364666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forma_pago" ADD "comision" float NOT NULL CONSTRAINT "DF_16e31161e5148e4075312f4dd22" DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP CONSTRAINT "DF_16e31161e5148e4075312f4dd22"`);
        await queryRunner.query(`ALTER TABLE "forma_pago" DROP COLUMN "comision"`);
    }

}
