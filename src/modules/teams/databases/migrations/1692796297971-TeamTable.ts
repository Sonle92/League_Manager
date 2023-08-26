import { MigrationInterface, QueryRunner } from 'typeorm';

export class TeamTable1692796297971 implements MigrationInterface {
  name = 'TeamTable1692796297971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying NOT NULL, "leagueLeagueId" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_964f8f555b786c254317271f365" FOREIGN KEY ("leagueLeagueId") REFERENCES "league"("league_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_964f8f555b786c254317271f365"`,
    );
    await queryRunner.query(`DROP TABLE "team"`);
  }
}
