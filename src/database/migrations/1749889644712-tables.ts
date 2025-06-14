import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749889644712 implements MigrationInterface {
    name = 'Tables1749889644712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_f83e2a612dc2fa999dc5141a101"`);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP COLUMN "cargoIdCargo"`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "cargoIdCargo" int`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_221f56fd0ec88f85014e20baf9e" FOREIGN KEY ("cargoIdCargo") REFERENCES "cargo"("idCargo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_221f56fd0ec88f85014e20baf9e"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "cargoIdCargo"`);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD "cargoIdCargo" int`);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_f83e2a612dc2fa999dc5141a101" FOREIGN KEY ("cargoIdCargo") REFERENCES "cargo"("idCargo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
