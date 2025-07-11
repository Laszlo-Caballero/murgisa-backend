import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752198926095 implements MigrationInterface {
    name = 'Tables1752198926095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" ADD "estado" bit NOT NULL CONSTRAINT "DF_d46a2d29a4ab8a9dd7c8ccdb8ba" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" DROP CONSTRAINT "DF_d46a2d29a4ab8a9dd7c8ccdb8ba"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" DROP COLUMN "estado"`);
    }

}
