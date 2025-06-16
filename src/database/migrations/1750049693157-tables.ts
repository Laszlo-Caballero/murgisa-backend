import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1750049693157 implements MigrationInterface {
    name = 'Tables1750049693157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log" ("idLog" int NOT NULL IDENTITY(1,1), "tipo" nvarchar(255) NOT NULL, "mensaje" nvarchar(255) NOT NULL, "fecha" datetime NOT NULL CONSTRAINT "DF_b815b9985c1a45bd9d69a1a5c54" DEFAULT getdate(), CONSTRAINT "PK_65efb699ca2587e38caef06b8a4" PRIMARY KEY ("idLog"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "log"`);
    }

}
