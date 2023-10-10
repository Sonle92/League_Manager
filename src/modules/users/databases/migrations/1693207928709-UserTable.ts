import { BaseMigration } from '@hodfords/typeorm-helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1693207928709 extends BaseMigration {
  async run(queryRunner: QueryRunner) {
    await this.create('user', (table) => {
      table.primaryUuid('id');
      table.string('username').nullable();
      table.string('password').nullable();
      table.string('email').nullable();
      table.string('role').default("'user'").nullable();
      table.string('refreshToken').length(500).nullable();
    });
  }

  async rollback(queryRunner: QueryRunner) {
    await this.drop('user');
  }
}
