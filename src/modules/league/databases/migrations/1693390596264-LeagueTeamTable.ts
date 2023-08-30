import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LeagueTeamTable1693390596264 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('league_team', (table) => {
      table.primaryUuid('id');
      table.uuid('leagueId').nullable().foreign('league');
      table.uuid('teamId').nullable().foreign('team');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('league_team');
  }
}
