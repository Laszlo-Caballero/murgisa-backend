import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749859130627 implements MigrationInterface {
    name = 'Tables1749859130627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forma_pago" ("idFormaPago" int NOT NULL IDENTITY(1,1), "tipo" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_b3dd7dd25ce80ebd8e3ee9f96f2" DEFAULT 1, CONSTRAINT "PK_5b0a473a761ac8106dad5447c28" PRIMARY KEY ("idFormaPago"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "forma_pago"`);
    }

}
