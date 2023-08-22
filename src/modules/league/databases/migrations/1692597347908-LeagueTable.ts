import { MigrationInterface, QueryRunner } from 'typeorm';

export class LeagueTable1692597347905 implements MigrationInterface {
  name = 'LeagueTable1692597347908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league" ("league_id" SERIAL NOT NULL, "league_name" character varying NOT NULL, "sport" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_d2233ce4e3266ca928203c4a37f" PRIMARY KEY ("league_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "league"`);
  }
}
