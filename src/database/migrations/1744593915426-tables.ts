import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1744593915426 implements MigrationInterface {
    name = 'Tables1744593915426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cliente" ("idCliente" int NOT NULL IDENTITY(1,1), "nombre" varchar(50) NOT NULL, "dni" char(8) NOT NULL, "correo" nvarchar(255) NOT NULL, "telefono" char(9) NOT NULL, "direccion" nvarchar(255) NOT NULL, CONSTRAINT "PK_f7385a8fade4ae61cfeca8e691a" PRIMARY KEY ("idCliente"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cliente"`);
    }

}
