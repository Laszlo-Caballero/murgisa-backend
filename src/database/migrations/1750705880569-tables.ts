import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1750705880569 implements MigrationInterface {
    name = 'Tables1750705880569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proveedor" ("idProovedor" int NOT NULL IDENTITY(1,1), "razonSocial" nvarchar(255) NOT NULL, "ruc" nvarchar(255) NOT NULL, "nombreResponsable" nvarchar(255) NOT NULL, "dniResponsable" nvarchar(255) NOT NULL, "correo" nvarchar(255) NOT NULL, "telefono" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_8991ac63ac65439da8e50a03c6e" DEFAULT 1, CONSTRAINT "PK_eba8a0eaf1fe7a2efb028e45866" PRIMARY KEY ("idProovedor"))`);
        await queryRunner.query(`CREATE TABLE "tipo_recurso" ("idTipoRecurso" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "descripcion" nvarchar(255) NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_5a34b3f74dc55bdb60fcd5e875e" DEFAULT 1, CONSTRAINT "PK_41c554ebdac6503d594a75f1f76" PRIMARY KEY ("idTipoRecurso"))`);
        await queryRunner.query(`CREATE TABLE "recurso" ("idRecurso" int NOT NULL IDENTITY(1,1), "nombre" nvarchar(255) NOT NULL, "precio" int NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_030fcf256205d6c4d5d5178ef26" DEFAULT 1, "tipoRecursoIdTipoRecurso" int, "proveedorIdProovedor" int, CONSTRAINT "PK_6b93be88565a250d10f56ffaf5d" PRIMARY KEY ("idRecurso"))`);
        await queryRunner.query(`CREATE TABLE "detalle_venta" ("idDetalleVenta" int NOT NULL IDENTITY(1,1), "precio" int NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_625f58bf9200faf3c46eea347f4" DEFAULT 1, "ventaIdVenta" int, "recursoIdRecurso" int, CONSTRAINT "PK_59761dc01cc3266eb37a4ac3440" PRIMARY KEY ("idDetalleVenta"))`);
        await queryRunner.query(`ALTER TABLE "recurso" ADD CONSTRAINT "FK_39441b0f3c70aa19ed87c0e4e5c" FOREIGN KEY ("tipoRecursoIdTipoRecurso") REFERENCES "tipo_recurso"("idTipoRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurso" ADD CONSTRAINT "FK_685375c4bb8741e57cab669e73f" FOREIGN KEY ("proveedorIdProovedor") REFERENCES "proveedor"("idProovedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_d5de2b8391c928e63e3121fab1a" FOREIGN KEY ("ventaIdVenta") REFERENCES "venta"("idVenta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" ADD CONSTRAINT "FK_5d04c9ddd65caf2f4f6644c19bc" FOREIGN KEY ("recursoIdRecurso") REFERENCES "recurso"("idRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_5d04c9ddd65caf2f4f6644c19bc"`);
        await queryRunner.query(`ALTER TABLE "detalle_venta" DROP CONSTRAINT "FK_d5de2b8391c928e63e3121fab1a"`);
        await queryRunner.query(`ALTER TABLE "recurso" DROP CONSTRAINT "FK_685375c4bb8741e57cab669e73f"`);
        await queryRunner.query(`ALTER TABLE "recurso" DROP CONSTRAINT "FK_39441b0f3c70aa19ed87c0e4e5c"`);
        await queryRunner.query(`DROP TABLE "detalle_venta"`);
        await queryRunner.query(`DROP TABLE "recurso"`);
        await queryRunner.query(`DROP TABLE "tipo_recurso"`);
        await queryRunner.query(`DROP TABLE "proveedor"`);
    }

}
