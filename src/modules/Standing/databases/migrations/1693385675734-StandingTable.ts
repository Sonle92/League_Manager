import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class StandingTable1693385675734 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('standing', (table) => {
      table.primaryUuid('id');
      table.uuid('teamId').nullable().foreign('team');
      table.uuid('leagueId').nullable().foreign('league');
      table.integer('rank').nullable().default(0);
      table.integer('played').nullable().default(0);
      table.integer('points').nullable().default(0);
      table.integer('matchesWon').nullable().default(0);
      table.integer('matchesDrawn').nullable().default(0);
      table.integer('matchesLost').nullable().default(0);
      table.integer('totalGoals').nullable().default(0);
      table.integer('totalGoalsConceded').nullable().default(0);
      table.integer('goalDifference').nullable().default(0);
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('standing');
  }
}
