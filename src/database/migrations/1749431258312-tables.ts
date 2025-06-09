import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749431258312 implements MigrationInterface {
    name = 'Tables1749431258312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profesion" ("idProfesion" int NOT NULL IDENTITY(1,1), "titulo" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_21cf52ba824fdb7a36747980335" DEFAULT 1, CONSTRAINT "PK_95f3c6f1bc49b7d46f0516779fa" PRIMARY KEY ("idProfesion"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profesion"`);
    }

}
