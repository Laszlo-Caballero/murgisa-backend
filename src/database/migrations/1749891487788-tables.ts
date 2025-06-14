import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1749891487788 implements MigrationInterface {
    name = 'Tables1749891487788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "db_murgisa.root.personal.apellido_parterno", "apellido_paterno"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "db_murgisa.root.personal.apellido_paterno", "apellido_parterno"`);
    }

}
