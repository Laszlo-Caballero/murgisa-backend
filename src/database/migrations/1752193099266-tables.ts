import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752193099266 implements MigrationInterface {
    name = 'Tables1752193099266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disponibilidad" ("disponibilidadId" int NOT NULL IDENTITY(1,1), "disponibilidad" nvarchar(255) NOT NULL, CONSTRAINT "PK_0a2bb04f53425b714c040e64d04" PRIMARY KEY ("disponibilidadId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "disponibilidad"`);
    }

}
