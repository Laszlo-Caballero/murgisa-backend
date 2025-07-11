import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752208840115 implements MigrationInterface {
    name = 'Tables1752208840115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_servicio" ADD "serviciosIdServicio" int`);
        await queryRunner.query(`ALTER TABLE "servicio" ADD "tipoServicioIdTipoServicio" int`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" ADD CONSTRAINT "FK_4483bcb2cb433253b83fed50f5f" FOREIGN KEY ("serviciosIdServicio") REFERENCES "servicio"("idServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servicio" ADD CONSTRAINT "FK_35bbc328a0d92440d2c8bb6b145" FOREIGN KEY ("tipoServicioIdTipoServicio") REFERENCES "tipo_servicio"("idTipoServicio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servicio" DROP CONSTRAINT "FK_35bbc328a0d92440d2c8bb6b145"`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" DROP CONSTRAINT "FK_4483bcb2cb433253b83fed50f5f"`);
        await queryRunner.query(`ALTER TABLE "servicio" DROP COLUMN "tipoServicioIdTipoServicio"`);
        await queryRunner.query(`ALTER TABLE "tipo_servicio" DROP COLUMN "serviciosIdServicio"`);
    }

}
