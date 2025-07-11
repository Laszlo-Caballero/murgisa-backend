import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752226447515 implements MigrationInterface {
    name = 'Tables1752226447515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" ADD "ruc" char(11) NOT NULL CONSTRAINT "DF_520ff2a49c8566639fcf2514275" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "DF_520ff2a49c8566639fcf2514275"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "ruc"`);
    }

}
