import { MigrationInterface, QueryRunner } from 'typeorm'

export class addNotification1625097990179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE jobResponse ADD COLUMN hasCompanyMessage bool DEFAULT false;')
    await queryRunner.query('ALTER TABLE jobResponse ADD COLUMN hasCandidateMessage bool DEFAULT false;')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE jobResponse DROP COLUMN hasCompanyMessage;')
    await queryRunner.query('ALTER TABLE jobResponse DROP COLUMN hasCandidateMessage;')
  }
}
