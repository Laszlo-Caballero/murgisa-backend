import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752197165529 implements MigrationInterface {
    name = 'Tables1752197165529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurso" ADD "disponibilidadDisponibilidadId" int`);
        await queryRunner.query(`ALTER TABLE "recurso" ADD CONSTRAINT "FK_9e7ba190cdb9b3a99248cafd5cc" FOREIGN KEY ("disponibilidadDisponibilidadId") REFERENCES "disponibilidad"("disponibilidadId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurso" DROP CONSTRAINT "FK_9e7ba190cdb9b3a99248cafd5cc"`);
        await queryRunner.query(`ALTER TABLE "recurso" DROP COLUMN "disponibilidadDisponibilidadId"`);
    }

}
