import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749878276208 implements MigrationInterface {
    name = 'Tables1749878276208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario" ADD "correo" nvarchar(255) NOT NULL CONSTRAINT "DF_631bf87f4acdcb87c6ff8648c37" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "DF_631bf87f4acdcb87c6ff8648c37"`);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP COLUMN "correo"`);
    }

}
