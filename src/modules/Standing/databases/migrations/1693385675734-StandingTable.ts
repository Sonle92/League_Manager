import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class StandingTable1693385675734 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('standing', (table) => {
      table.primaryUuid('id');
      table.uuid('teamId').nullable().foreign('team');
      table.uuid('leagueId').nullable().foreign('league');
      table.integer('rank').nullable();
      table.integer('played').nullable();
      table.integer('points').nullable();
      table.integer('matches_won').nullable();
      table.integer('matchesDrawn').nullable();
      table.integer('matcheslost').nullable();
      table.integer('totalGoals').nullable();
      table.integer('totalGoalsConceded').nullable();
      table.integer('goalDifference').nullable();
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('standing');
  }
}
