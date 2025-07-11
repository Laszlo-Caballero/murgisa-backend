import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752213381940 implements MigrationInterface {
    name = 'Tables1752213381940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departamento" DROP CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "presupuesto"`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "presupuesto" nvarchar(MAX) NOT NULL CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departamento" DROP CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "presupuesto"`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "presupuesto" float NOT NULL`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e" DEFAULT 0 FOR "presupuesto"`);
    }

}
