import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749437518814 implements MigrationInterface {
    name = 'Tables1749437518814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" ADD "estado" bit NOT NULL CONSTRAINT "DF_9dc2bb9aea9e2ae54d910cc70fe" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "DF_9dc2bb9aea9e2ae54d910cc70fe"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "estado"`);
    }

}
