import { MigrationInterface, QueryRunner } from 'typeorm';

export class syllabusMs1666842202126 implements MigrationInterface {
  name = 'syllabusMs1666842202126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL,"username" character varying NOT NULL,"password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d93d6492a0b45e1d77fa8e2a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
