import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class StatisticsTable1695614874972 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('statistics', (table) => {
      table.primaryUuid('id');
      table.uuid('goalId').nullable().foreign('goal');
      table.uuid('cardId').nullable().foreign('card');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('statistics');
  }
}
