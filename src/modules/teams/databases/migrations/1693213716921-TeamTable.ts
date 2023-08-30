import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TeamTable1693213716921 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('team', (table) => {
      table.primaryUuid('id');
      table.string('name').nullable();
      table.string('logo').nullable();
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('team');
  }
}
