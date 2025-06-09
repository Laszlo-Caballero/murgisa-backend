import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749435456276 implements MigrationInterface {
    name = 'Tables1749435456276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ciudad" ("idCiudad" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, CONSTRAINT "PK_19adc99d9c1dff5abeb5203948c" PRIMARY KEY ("idCiudad"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ciudad"`);
    }

}
