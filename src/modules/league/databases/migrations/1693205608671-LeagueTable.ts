import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LeagueTable1693205608671 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('league', (table) => {
      table.primaryUuid('id');
      table.string('name').nullable();
      table.string('sport').nullable();
      table.timestamp('startDate').nullable();
      table.timestamp('endDate').nullable();
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('league');
  }
}
