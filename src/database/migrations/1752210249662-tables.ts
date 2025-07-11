import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752210249662 implements MigrationInterface {
    name = 'Tables1752210249662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_servicio" ADD "descripcion" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" ADD "estado" bit NOT NULL CONSTRAINT "DF_a53ce6996d0aadf25f90da15d8f" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_servicio" DROP CONSTRAINT "DF_a53ce6996d0aadf25f90da15d8f"`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" DROP COLUMN "descripcion"`);
    }

}
