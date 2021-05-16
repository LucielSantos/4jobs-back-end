import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateJob1620435106567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'jobs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'companyId',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'deadlineResolve',
            type: 'integer',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'expectedResolution',
            type: 'varchar',
          },
          {
            name: 'observations',
            type: 'varchar',
          },
          {
            name: 'tags',
            type: 'text',
          },
          {
            name: 'fields',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCompany',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['companyId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('jobs')
  }
}
