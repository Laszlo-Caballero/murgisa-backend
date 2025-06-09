import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749447331639 implements MigrationInterface {
    name = 'Tables1749447331639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" ADD "razonSocial" varchar(100) NOT NULL CONSTRAINT "DF_6525fb3b1a2b81ecf2e7bf92ab2" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "DF_6525fb3b1a2b81ecf2e7bf92ab2"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "razonSocial"`);
    }

}
