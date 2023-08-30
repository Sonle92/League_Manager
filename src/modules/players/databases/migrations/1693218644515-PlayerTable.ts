import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlayerTable1693218644515 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('player', (table) => {
      table.primaryUuid('id');
      table.string('player_name').nullable();
      table.integer('age').nullable();
      table.string('poisition').nullable();
      table.uuid('teamId').foreign('team');
    });
  }
  async rollback(queryRunner: QueryRunner) {
    await this.drop('player');
  }
}
