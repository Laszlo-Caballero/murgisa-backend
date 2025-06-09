import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1748583570517 implements MigrationInterface {
    name = 'Tables1748583570517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "servicio" ("idServicio" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(100) NOT NULL, "estado" bit NOT NULL, "precio" float NOT NULL, CONSTRAINT "PK_573b59d61c91e2582ad47370294" PRIMARY KEY ("idServicio"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "servicio"`);
    }

}
