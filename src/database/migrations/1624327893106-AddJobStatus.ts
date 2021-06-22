import { jobStatus } from '../../constants'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddJobStatus1624327893106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE jobs ADD COLUMN status INT DEFAULT ${jobStatus.opened};`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE jobs DROP COLUMN status;')
  }
}
