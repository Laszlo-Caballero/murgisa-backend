import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749442311468 implements MigrationInterface {
    name = 'Tables1749442311468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cargo" ("idCargo" int NOT NULL IDENTITY(1,1), "cargo" nvarchar(50) NOT NULL, "descripcion" nvarchar(100) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_53cdd8108efe92f404b51ca3684" DEFAULT 1, CONSTRAINT "PK_c27343ed0608957d13c7e341a62" PRIMARY KEY ("idCargo"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cargo"`);
    }

}
