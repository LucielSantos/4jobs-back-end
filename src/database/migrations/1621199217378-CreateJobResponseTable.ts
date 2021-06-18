import { jobResponseTypes } from '../../constants'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateJobResponseTable1621199217378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'jobResponse',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'candidateId',
            type: 'varchar',
          },
          {
            name: 'jobId',
            type: 'varchar',
          },
          {
            name: 'companyId',
            type: 'varchar',
          },
          {
            name: 'challengeResolved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'status',
            type: 'integer',
            default: jobResponseTypes.registered,
          },
          {
            name: 'response',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'messages',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKJobResponseCandidate',
            referencedTableName: 'candidates',
            referencedColumnNames: ['id'],
            columnNames: ['candidateId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKJobResponseJob',
            referencedTableName: 'jobs',
            referencedColumnNames: ['id'],
            columnNames: ['jobId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKJobResponseCompany',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['companyId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('jobResponse')
  }
}
