import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752203772263 implements MigrationInterface {
    name = 'Tables1752203772263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "horario" ("idhorario" int NOT NULL IDENTITY(1,1), "horaInicio" datetime NOT NULL, "horaFin" datetime NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_59c91ee8139be0989193252a0c0" DEFAULT 1, CONSTRAINT "PK_88111b3afd27845a6fad69c7765" PRIMARY KEY ("idhorario"))`);
        await queryRunner.query(`CREATE TABLE "mantenimiento_preventivo" ("mantenimientoPreventivoId" int NOT NULL IDENTITY(1,1), "fechaMantenimiento" datetime NOT NULL, "prioridad" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_6a03707511869e623cb6af1f85f" DEFAULT 1, "recursoIdRecurso" int, "personalIdPersonal" int, "horarioIdhorario" int, CONSTRAINT "PK_99da70783a0b5715a76b939accb" PRIMARY KEY ("mantenimientoPreventivoId"))`);
        await queryRunner.query(`CREATE TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" ("tipoMantenimientoTipoMantenimientoId" int NOT NULL, "mantenimientoPreventivoMantenimientoPreventivoId" int NOT NULL, CONSTRAINT "PK_f6f3b2ea240ff14c2275d0d6c0a" PRIMARY KEY ("tipoMantenimientoTipoMantenimientoId", "mantenimientoPreventivoMantenimientoPreventivoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_33a00eeaadca43df752d209452" ON "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" ("tipoMantenimientoTipoMantenimientoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c3e9ddd907200582177dfe184" ON "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" ("mantenimientoPreventivoMantenimientoPreventivoId") `);
        await queryRunner.query(`ALTER TABLE "personal" ADD "mantenimientoPreventivoMantenimientoPreventivoId" int`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "descripcion" nvarchar(MAX) NOT NULL CONSTRAINT "DF_6cf962e25e6e448562f2f046c5a" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" ADD CONSTRAINT "FK_649dc5e1ec255493098f9b16bee" FOREIGN KEY ("recursoIdRecurso") REFERENCES "recurso"("idRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" ADD CONSTRAINT "FK_fa74b67de728433fe0995408690" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" ADD CONSTRAINT "FK_c80af5e1614732235b02acb8d99" FOREIGN KEY ("horarioIdhorario") REFERENCES "horario"("idhorario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_e68abee7f1fe140a326226be41c" FOREIGN KEY ("mantenimientoPreventivoMantenimientoPreventivoId") REFERENCES "mantenimiento_preventivo"("mantenimientoPreventivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" ADD CONSTRAINT "FK_33a00eeaadca43df752d2094527" FOREIGN KEY ("tipoMantenimientoTipoMantenimientoId") REFERENCES "tipo_mantenimiento"("tipoMantenimientoId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" ADD CONSTRAINT "FK_7c3e9ddd907200582177dfe1843" FOREIGN KEY ("mantenimientoPreventivoMantenimientoPreventivoId") REFERENCES "mantenimiento_preventivo"("mantenimientoPreventivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" DROP CONSTRAINT "FK_7c3e9ddd907200582177dfe1843"`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo" DROP CONSTRAINT "FK_33a00eeaadca43df752d2094527"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_e68abee7f1fe140a326226be41c"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" DROP CONSTRAINT "FK_c80af5e1614732235b02acb8d99"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" DROP CONSTRAINT "FK_fa74b67de728433fe0995408690"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_preventivo" DROP CONSTRAINT "FK_649dc5e1ec255493098f9b16bee"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP CONSTRAINT "DF_6cf962e25e6e448562f2f046c5a"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "descripcion" nvarchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "mantenimientoPreventivoMantenimientoPreventivoId"`);
        await queryRunner.query(`DROP INDEX "IDX_7c3e9ddd907200582177dfe184" ON "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo"`);
        await queryRunner.query(`DROP INDEX "IDX_33a00eeaadca43df752d209452" ON "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo"`);
        await queryRunner.query(`DROP TABLE "tipo_mantenimiento_mantenimiento_preventivo_mantenimiento_preventivo"`);
        await queryRunner.query(`DROP TABLE "mantenimiento_preventivo"`);
        await queryRunner.query(`DROP TABLE "horario"`);
    }

}
