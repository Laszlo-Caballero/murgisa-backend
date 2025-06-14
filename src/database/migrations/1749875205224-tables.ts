import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749875205224 implements MigrationInterface {
    name = 'Tables1749875205224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Usuario" ("idUsuario" int NOT NULL IDENTITY(1,1), "usuario" nvarchar(255) NOT NULL, "contrasena" nvarchar(255) NOT NULL, "cargoIdCargo" int, CONSTRAINT "PK_b7eceb38fdbcd4d575b20676d26" PRIMARY KEY ("idUsuario"))`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "titulo" nvarchar(50) NOT NULL CONSTRAINT "DF_84eb53d18e09792d6d555a31771" DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "departamento" ADD "presupuesto" float NOT NULL CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e" DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_f83e2a612dc2fa999dc5141a101" FOREIGN KEY ("cargoIdCargo") REFERENCES "cargo"("idCargo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_f83e2a612dc2fa999dc5141a101"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP CONSTRAINT "DF_dd38d226b72b5b5c41a407b825e"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "presupuesto"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP CONSTRAINT "DF_84eb53d18e09792d6d555a31771"`);
        await queryRunner.query(`ALTER TABLE "departamento" DROP COLUMN "titulo"`);
        await queryRunner.query(`DROP TABLE "Usuario"`);
    }

}
