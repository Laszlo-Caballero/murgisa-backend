import { MigrationInterface, QueryRunner } from 'typeorm';

export class Disponibilidad1752193148291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            Insert into disponibilidad (disponibilidad) values
            ('Disponible'),
            ('No Disponible')
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            Delete from disponibilidad where disponibilidad in ('Disponible', 'No Disponible');
            `);
  }
}
