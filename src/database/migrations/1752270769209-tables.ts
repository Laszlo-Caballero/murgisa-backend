import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752270769209 implements MigrationInterface {
    name = 'Tables1752270769209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nota_salida" ADD "estado" bit NOT NULL CONSTRAINT "DF_cc037f5f73bd530c96d677bcbbf" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "nota_salida" ADD "fecha" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nota_salida" ADD "recursoIdRecurso" int`);
        await queryRunner.query(`ALTER TABLE "nota_salida" ADD CONSTRAINT "FK_a3347d604c8d89c534ab1ca5598" FOREIGN KEY ("recursoIdRecurso") REFERENCES "recurso"("idRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP CONSTRAINT "FK_a3347d604c8d89c534ab1ca5598"`);
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP COLUMN "recursoIdRecurso"`);
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP CONSTRAINT "DF_cc037f5f73bd530c96d677bcbbf"`);
        await queryRunner.query(`ALTER TABLE "nota_salida" DROP COLUMN "estado"`);
    }

}
