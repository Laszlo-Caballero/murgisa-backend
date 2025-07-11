import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752208754712 implements MigrationInterface {
    name = 'Tables1752208754712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_servicio" ("idTipoServicio" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, CONSTRAINT "PK_318267a7ffbc6c2d44a7df38678" PRIMARY KEY ("idTipoServicio"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipo_servicio"`);
    }

}
