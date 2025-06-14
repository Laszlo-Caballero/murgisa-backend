import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749890108008 implements MigrationInterface {
    name = 'Tables1749890108008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario" ADD "personalIdPersonal" int`);
        await queryRunner.query(`ALTER TABLE "personal" ADD "usuarioIdUsuario" int`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_35705b4865b23683b9ee81c938" ON "Usuario" ("personalIdPersonal") WHERE "personalIdPersonal" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_d1a22e268964da8bfba0c06cf7" ON "personal" ("usuarioIdUsuario") WHERE "usuarioIdUsuario" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_35705b4865b23683b9ee81c9382" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_d1a22e268964da8bfba0c06cf73" FOREIGN KEY ("usuarioIdUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_d1a22e268964da8bfba0c06cf73"`);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_35705b4865b23683b9ee81c9382"`);
        await queryRunner.query(`DROP INDEX "REL_d1a22e268964da8bfba0c06cf7" ON "personal"`);
        await queryRunner.query(`DROP INDEX "REL_35705b4865b23683b9ee81c938" ON "Usuario"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "usuarioIdUsuario"`);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP COLUMN "personalIdPersonal"`);
    }

}
