import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749437995153 implements MigrationInterface {
    name = 'Tables1749437995153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departamento" ("idDepartamento" int NOT NULL IDENTITY(1,1), "descripcion" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_717802580eed056abf5d99582d1" DEFAULT 1, CONSTRAINT "PK_c900795eedd4ca909e8d2c48407" PRIMARY KEY ("idDepartamento"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "departamento"`);
    }

}
