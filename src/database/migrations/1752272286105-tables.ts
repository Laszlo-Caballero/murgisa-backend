import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1752272286105 implements MigrationInterface {
    name = 'Tables1752272286105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nota_entrada" ("idNotaEntrada" int NOT NULL IDENTITY(1,1), "cantidad" int NOT NULL, "monto" int NOT NULL, "estado" bit NOT NULL CONSTRAINT "DF_e9feb3b78663b7935f1331231cf" DEFAULT 1, "fecha" datetime NOT NULL, "recursoIdRecurso" int, "proveedorIdProovedor" int, CONSTRAINT "PK_0cc7bd8e5626bfbecdd65e84672" PRIMARY KEY ("idNotaEntrada"))`);
        await queryRunner.query(`ALTER TABLE "nota_entrada" ADD CONSTRAINT "FK_1c95a4315a0b2cb213e26d04990" FOREIGN KEY ("recursoIdRecurso") REFERENCES "recurso"("idRecurso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota_entrada" ADD CONSTRAINT "FK_8e03d42e3ece398b907eb8aae06" FOREIGN KEY ("proveedorIdProovedor") REFERENCES "proveedor"("idProovedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nota_entrada" DROP CONSTRAINT "FK_8e03d42e3ece398b907eb8aae06"`);
        await queryRunner.query(`ALTER TABLE "nota_entrada" DROP CONSTRAINT "FK_1c95a4315a0b2cb213e26d04990"`);
        await queryRunner.query(`DROP TABLE "nota_entrada"`);
    }

}
