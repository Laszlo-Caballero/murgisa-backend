import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ciudad1749970575069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO ciudad (nombre) VALUES
('Abancay'),
('Arequipa'),
('Ayacucho'),
('Cajamarca'),
('Callao'),
('Chiclayo'),
('Chimbote'),
('Chincha Alta'),
('Cuzco'),
('Huancayo'),
('Huánuco'),
('Ica'),
('Iquitos'),
('Juliaca'),
('Lambayeque'),
('Lima'),
('Piura'),
('Pucallpa'),
('Puno'),
('Tacna'),
('Talara'),
('Tarapoto'),
('Trujillo'),
('Tumbes');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ciudad WHERE nombre IN
('Abancay',
'Arequipa',
'Ayacucho',
'Cajamarca',
'Callao',
'Chiclayo',
'Chimbote',
'Chincha Alta',
'Cuzco',
'Huancayo',
'Huánuco',
'Ica',
'Iquitos',
'Juliaca',
'Lambayeque',
'Lima',
'Piura',
'Pucallpa',
'Puno',
'Tacna',
'Talara',
'Tarapoto',
'Trujillo',
'Tumbes');
`);
  }
}
