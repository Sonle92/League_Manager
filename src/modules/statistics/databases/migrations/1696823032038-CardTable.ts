import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CardTable1696823032038 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('card', (table) => {
      table.primaryUuid('id');
      table.string('minute').nullable();
      table.boolean('redCard').nullable();
      table.boolean('yellowCard').nullable();
      table.uuid('scheduleId').nullable().foreign('schedule');
      table.uuid('playerId').nullable().foreign('player');
      table.uuid('teamId').nullable().foreign('team');
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('card');
  }
}
