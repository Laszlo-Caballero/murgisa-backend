import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752262457122 implements MigrationInterface {
    name = 'Tables1752262457122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento" ADD "estado" bit NOT NULL CONSTRAINT "DF_3baff932596ffaeaf1602bdc7ec" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento" DROP CONSTRAINT "DF_3baff932596ffaeaf1602bdc7ec"`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento" DROP COLUMN "estado"`);
    }

}
