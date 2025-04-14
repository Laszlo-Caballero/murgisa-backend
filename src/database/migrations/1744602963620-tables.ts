import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1744602963620 implements MigrationInterface {
    name = 'Tables1744602963620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" ADD "fechaNacimiento" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "nombre" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "telefono" varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "telefono" char(9) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD "nombre" varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "fechaNacimiento"`);
    }

}
