import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752196997557 implements MigrationInterface {
    name = 'Tables1752196997557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_mantenimiento" ("tipoMantenimientoId" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "duracion" nvarchar(255) NOT NULL, CONSTRAINT "PK_636e265fc860d2e9211d9e5204b" PRIMARY KEY ("tipoMantenimientoId"))`);
        await queryRunner.query(`CREATE TABLE "mantenimiento_correctivo" ("mantenimientoCorrectivoId" int NOT NULL IDENTITY(1,1), "fechaInicio" datetime NOT NULL, "precio" float NOT NULL, "recursoIdRecurso" int, "personalIdPersonal" int, CONSTRAINT "PK_02373fcd0869a76c47768e1ebf4" PRIMARY KEY ("mantenimientoCorrectivoId"))`);
        await queryRunner.query(`CREATE TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" ("tipoMantenimientoTipoMantenimientoId" int NOT NULL, "mantenimientoCorrectivoMantenimientoCorrectivoId" int NOT NULL, CONSTRAINT "PK_fbc3d68b8e7b223034bbee74a63" PRIMARY KEY ("tipoMantenimientoTipoMantenimientoId", "mantenimientoCorrectivoMantenimientoCorrectivoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c1ab848951b9994e0b3926adc" ON "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" ("tipoMantenimientoTipoMantenimientoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_566dbb51ceb33f72be34385a0b" ON "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" ("mantenimientoCorrectivoMantenimientoCorrectivoId") `);
        await queryRunner.query(`ALTER TABLE "personal" ADD "mantenimientoCorrectivoMantenimientoCorrectivoId" int`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" ADD CONSTRAINT "FK_9ca975bd339a1c8278e17f13d19" FOREIGN KEY ("recursoIdRecurso") REFERENCES "recurso"("idRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" ADD CONSTRAINT "FK_f571418671479d395f881779892" FOREIGN KEY ("personalIdPersonal") REFERENCES "personal"("idPersonal") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_05983f1ffbb6dda43a85d226d1e" FOREIGN KEY ("mantenimientoCorrectivoMantenimientoCorrectivoId") REFERENCES "mantenimiento_correctivo"("mantenimientoCorrectivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" ADD CONSTRAINT "FK_1c1ab848951b9994e0b3926adc4" FOREIGN KEY ("tipoMantenimientoTipoMantenimientoId") REFERENCES "tipo_mantenimiento"("tipoMantenimientoId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" ADD CONSTRAINT "FK_566dbb51ceb33f72be34385a0b7" FOREIGN KEY ("mantenimientoCorrectivoMantenimientoCorrectivoId") REFERENCES "mantenimiento_correctivo"("mantenimientoCorrectivoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" DROP CONSTRAINT "FK_566dbb51ceb33f72be34385a0b7"`);
        await queryRunner.query(`ALTER TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo" DROP CONSTRAINT "FK_1c1ab848951b9994e0b3926adc4"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_05983f1ffbb6dda43a85d226d1e"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" DROP CONSTRAINT "FK_f571418671479d395f881779892"`);
        await queryRunner.query(`ALTER TABLE "mantenimiento_correctivo" DROP CONSTRAINT "FK_9ca975bd339a1c8278e17f13d19"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP COLUMN "mantenimientoCorrectivoMantenimientoCorrectivoId"`);
        await queryRunner.query(`DROP INDEX "IDX_566dbb51ceb33f72be34385a0b" ON "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo"`);
        await queryRunner.query(`DROP INDEX "IDX_1c1ab848951b9994e0b3926adc" ON "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo"`);
        await queryRunner.query(`DROP TABLE "tipo_mantenimiento_mantenimiento_correctivo_mantenimiento_correctivo"`);
        await queryRunner.query(`DROP TABLE "mantenimiento_correctivo"`);
        await queryRunner.query(`DROP TABLE "tipo_mantenimiento"`);
    }

}
