import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCandidate1618027510250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'about',
            type: 'varchar',
          },
          {
            name: 'locality',
            type: 'varchar',
          },
          {
            name: 'skills',
            type: 'varchar',
          },
          {
            name: 'formations',
            type: 'varchar',
          },
          {
            name: 'experiences',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candidates')
  }
}
