import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GoalTable1696822229005 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('goal', (table) => {
      table.primaryUuid('id');
      table.string('minute').nullable();
      table.uuid('scheduleId').nullable().foreign('schedule');
      table.uuid('playerId').nullable().foreign('player');
      table.uuid('teamId').nullable().foreign('team');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('goal');
  }
}
