import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScheduleTable1693403866886 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('schedule', (table) => {
      table.primaryUuid('id');
      table.date('date').nullable();
      table.string('time').nullable();
      table.string('venue').nullable();
      table.string('homeTeam').nullable();
      table.string('awayTeam').nullable();
      table.integer('homeTeam_Score').nullable();
      table.integer('awayTeam_Score').nullable();
      table.uuid('leagueId').nullable().foreign('league');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('schedule');
  }
}
