import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749890417272 implements MigrationInterface {
    name = 'Tables1749890417272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" ADD "numeroDocumento" nvarchar(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "telefono" nvarchar(9) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "fechaIngreso" datetime NOT NULL CONSTRAINT "DF_0b782c697b07c5c8b8783a3c896" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "profesionIdProfesion" int`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_17510e15574ac056006f25aa893" FOREIGN KEY ("profesionIdProfesion") REFERENCES "profesion"("idProfesion") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_17510e15574ac056006f25aa893"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "profesionIdProfesion"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "DF_0b782c697b07c5c8b8783a3c896"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "fechaIngreso"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "numeroDocumento"`);
    }

}
