import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752213722414 implements MigrationInterface {
    name = 'Tables1752213722414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servicio" ADD "descripcion" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "servicio" ADD "duracion" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servicio" DROP COLUMN "duracion"`);
        await queryRunner.query(`ALTER TABLE "servicio" DROP COLUMN "descripcion"`);
    }

}
