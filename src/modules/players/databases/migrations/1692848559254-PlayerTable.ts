import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlayerTable1692848559254 implements MigrationInterface {
  name = 'PlayerTable1692848559254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player" ("player_id" SERIAL NOT NULL, "player_name" character varying NOT NULL, "age" integer NOT NULL, "poisition" character varying NOT NULL, "teamId" integer, CONSTRAINT "PK_3604cfdbf6a3c85fa5aa2edeae8" PRIMARY KEY ("player_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0"`,
    );
    await queryRunner.query(`DROP TABLE "player"`);
  }
}
