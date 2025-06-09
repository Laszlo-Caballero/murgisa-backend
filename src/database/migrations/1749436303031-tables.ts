import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749436303031 implements MigrationInterface {
    name = 'Tables1749436303031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" ADD "ciudadIdCiudad" int`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_8d56e48a3a197ba3c26990a8750" FOREIGN KEY ("ciudadIdCiudad") REFERENCES "ciudad"("idCiudad") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_8d56e48a3a197ba3c26990a8750"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP COLUMN "ciudadIdCiudad"`);
    }

}
