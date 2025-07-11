import { MigrationInterface, QueryRunner } from 'typeorm';

export class Data1752266299271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into cargo (cargo, descripcion, estado) values (
                'Gerente', 'Gerente de murgisa', 1
            )
        `);

    await queryRunner.query(`
            insert into profesion (titulo, estado) values(
                'Arquitecto', 1
            )
        `);
    await queryRunner.query(`
            insert into departamento (titulo, descripcion, estado, presupuesto) values(
                'Gerencia', 'Departamento de gerencia', 1, 30000
            )
        `);
    await queryRunner.query(`
                insert into personal (nombre, apellido_paterno, apellido_materno, sueldo, numeroDocumento, telefono, estado, fechaIngreso, cargoIdCargo, 
                profesionIdProfesion, departamentoIdDepartamento
                ) values (
                    'Laszlo', 'Caballero', 'Sipiran', 1000, '70672402', '977834606', 1, '2023-10-01', 1, 1, 1
                )
            `);
    await queryRunner.query(`
        insert into usuario (usuario, contrasena, correo, personalIdPersonal) values (
        'laszlo', '$2b$10$l5WSTVdJIwra/Nl6Z5n2TOWvulGn3NLMdmRg8uWwS9gQjAzB3.P.m', 'laszlo@gmail.com', 1)
        `);
    await queryRunner.query(`
            update personal set usuarioIdUsuario = 1  where idPersonal = 1
        `);

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

    await queryRunner.query(`
            Insert into disponibilidad (disponibilidad) values
            ('Disponible'),
            ('En Mantenimiento'),
            ('Alquilado'),
            ('No Disponible')
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

    await queryRunner.query(`
            Delete from disponibilidad where disponibilidad in ('Disponible', 'No Disponible');
            `);
  }
}
