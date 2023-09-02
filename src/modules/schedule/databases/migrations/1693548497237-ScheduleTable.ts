import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScheduleTable1693548497237 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('schedule', (table) => {
      table.primaryUuid('id');
      table.date('date').nullable();
      table.string('startTime').nullable();
      table.string('venue').nullable();
      table.uuid('homeTeamId').nullable().foreign('team');
      table.uuid('awayTeamId').nullable().foreign('team');
      table.integer('homeTeamScore').nullable();
      table.integer('awayTeamScore').nullable();
      table.uuid('leagueId').nullable().foreign('league');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('schedule');
  }
}
