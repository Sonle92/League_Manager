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
      table.integer('matches_drawn').nullable();
      table.integer('matches_lost').nullable();
      table.integer('total_goals').nullable();
      table.integer('total_goals_conceded').nullable();
      table.integer('goal_difference').nullable();
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('standing');
  }
}
