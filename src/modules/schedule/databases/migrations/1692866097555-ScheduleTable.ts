import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScheduleTable1692866097555 implements MigrationInterface {
  name = 'ScheduleTable1692866097555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule_match" ("schedule_id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME NOT NULL, "venue" character varying NOT NULL, "leagueLeagueId" integer, "homeTeamId" integer, "awayTeamId" integer, CONSTRAINT "PK_69ec6561271fc06dde828e7cf0a" PRIMARY KEY ("schedule_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_match" ADD CONSTRAINT "FK_c910b3ccda65010fa0163a57993" FOREIGN KEY ("leagueLeagueId") REFERENCES "league"("league_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_match" ADD CONSTRAINT "FK_65ae35bf70b94e0a14b64831369" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_match" ADD CONSTRAINT "FK_83522c08df715fd08381b11c695" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule_match" DROP CONSTRAINT "FK_83522c08df715fd08381b11c695"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_match" DROP CONSTRAINT "FK_65ae35bf70b94e0a14b64831369"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_match" DROP CONSTRAINT "FK_c910b3ccda65010fa0163a57993"`,
    );
    await queryRunner.query(`DROP TABLE "schedule_match"`);
  }
}
