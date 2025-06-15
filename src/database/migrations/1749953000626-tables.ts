import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749953000626 implements MigrationInterface {
    name = 'Tables1749953000626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profesion" ADD "descripcion" nvarchar(255) NOT NULL CONSTRAINT "DF_36f8d9bc2f27932cc019995c690" DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profesion" DROP CONSTRAINT "DF_36f8d9bc2f27932cc019995c690"`);
        await queryRunner.query(`ALTER TABLE "profesion" DROP COLUMN "descripcion"`);
    }

}
