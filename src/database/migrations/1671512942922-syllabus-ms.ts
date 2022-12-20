import { MigrationInterface, QueryRunner } from 'typeorm';

export class syllabusMs1671512942922 implements MigrationInterface {
  name = 'syllabusMs1671512942922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_8576681f320398f678310a996f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP CONSTRAINT "FK_891d1b96e28c54f545e62be298f"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."approval_requests_entity_type_enum" AS ENUM('syllabus', 'program')`,
    );
    await queryRunner.query(
      `CREATE TABLE "approval_requests" ("id" SERIAL NOT NULL, "entity_type" "public"."approval_requests_entity_type_enum" NOT NULL, "entity_id" integer NOT NULL, "draft_entity" jsonb, "current_entity" jsonb, "comment" character varying, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "requester_id" integer, "reviewer_id" integer, CONSTRAINT "PK_484806bb8ff331b851fc75973c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "program_id" integer, "parent_id" integer, CONSTRAINT "PK_e5ff1032679363daced4f770e4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "syllabuses_prerequisite_courses_syllabuses" ("syllabuses_id_1" integer NOT NULL, "syllabuses_id_2" integer NOT NULL, CONSTRAINT "PK_a9e12afde9f02f10cc74b4df7ba" PRIMARY KEY ("syllabuses_id_1", "syllabuses_id_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_db87eedde3e37bd38bba25f73a" ON "syllabuses_prerequisite_courses_syllabuses" ("syllabuses_id_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b25fc1f0cd9db841c1a65e3efe" ON "syllabuses_prerequisite_courses_syllabuses" ("syllabuses_id_2") `,
    );
    await queryRunner.query(
      `CREATE TABLE "course_group_courses_syllabuses" ("course_group_id" integer NOT NULL, "syllabuses_id" integer NOT NULL, CONSTRAINT "PK_c62de5a43ea8ac6962becc113a9" PRIMARY KEY ("course_group_id", "syllabuses_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74120d92ea4db86618e6d386c0" ON "course_group_courses_syllabuses" ("course_group_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cea0b45a54f00133785f90dbd8" ON "course_group_courses_syllabuses" ("syllabuses_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "course_group_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_656844589bd6ae77322b8445c30" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_684f0090217e79c93db9f0838b" ON "course_group_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be59e0dee1698551f2f0d292a0" ON "course_group_closure" ("id_descendant") `,
    );
    await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "version"`);
    await queryRunner.query(
      `ALTER TABLE "syllabuses" DROP COLUMN "version_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" DROP COLUMN "approve_timeline"`,
    );
    await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "course_id"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "major_id"`);
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD "course_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD "course_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "vietnamese_program_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "english_program_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "degree" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "year_of" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "english_degree_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "vietnamese_degree_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "standard_output" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "program_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "status" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "is_hidden" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."syllabuses_status_enum" RENAME TO "syllabuses_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."syllabuses_status_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ALTER COLUMN "status" TYPE "public"."syllabuses_status_enum" USING "status"::"text"::"public"."syllabuses_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."syllabuses_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "approval_requests" ADD CONSTRAINT "FK_f4a45b5db5843bfa288d63e2ff4" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "approval_requests" ADD CONSTRAINT "FK_de19c7d19cfbcf9130d1f6e837f" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group" ADD CONSTRAINT "FK_ccb8cda4a7686116b145ccd81ea" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group" ADD CONSTRAINT "FK_5bbe18c477b20efa650166a1ae1" FOREIGN KEY ("parent_id") REFERENCES "course_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses_prerequisite_courses_syllabuses" ADD CONSTRAINT "FK_db87eedde3e37bd38bba25f73ad" FOREIGN KEY ("syllabuses_id_1") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses_prerequisite_courses_syllabuses" ADD CONSTRAINT "FK_b25fc1f0cd9db841c1a65e3efe3" FOREIGN KEY ("syllabuses_id_2") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_courses_syllabuses" ADD CONSTRAINT "FK_74120d92ea4db86618e6d386c06" FOREIGN KEY ("course_group_id") REFERENCES "course_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_courses_syllabuses" ADD CONSTRAINT "FK_cea0b45a54f00133785f90dbd80" FOREIGN KEY ("syllabuses_id") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_closure" ADD CONSTRAINT "FK_684f0090217e79c93db9f0838b8" FOREIGN KEY ("id_ancestor") REFERENCES "course_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_closure" ADD CONSTRAINT "FK_be59e0dee1698551f2f0d292a0c" FOREIGN KEY ("id_descendant") REFERENCES "course_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_group_closure" DROP CONSTRAINT "FK_be59e0dee1698551f2f0d292a0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_closure" DROP CONSTRAINT "FK_684f0090217e79c93db9f0838b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_courses_syllabuses" DROP CONSTRAINT "FK_cea0b45a54f00133785f90dbd80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group_courses_syllabuses" DROP CONSTRAINT "FK_74120d92ea4db86618e6d386c06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses_prerequisite_courses_syllabuses" DROP CONSTRAINT "FK_b25fc1f0cd9db841c1a65e3efe3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses_prerequisite_courses_syllabuses" DROP CONSTRAINT "FK_db87eedde3e37bd38bba25f73ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group" DROP CONSTRAINT "FK_5bbe18c477b20efa650166a1ae1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_group" DROP CONSTRAINT "FK_ccb8cda4a7686116b145ccd81ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "approval_requests" DROP CONSTRAINT "FK_de19c7d19cfbcf9130d1f6e837f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "approval_requests" DROP CONSTRAINT "FK_f4a45b5db5843bfa288d63e2ff4"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."syllabuses_status_enum_old" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ALTER COLUMN "status" TYPE "public"."syllabuses_status_enum_old" USING "status"::"text"::"public"."syllabuses_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."syllabuses_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."syllabuses_status_enum_old" RENAME TO "syllabuses_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "is_hidden"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "program_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "standard_output"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "vietnamese_degree_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "english_degree_name"`,
    );
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "year_of"`);
    await queryRunner.query(`ALTER TABLE "programs" DROP COLUMN "degree"`);
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "english_program_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP COLUMN "vietnamese_program_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" DROP COLUMN "course_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" DROP COLUMN "course_code"`,
    );
    await queryRunner.query(`ALTER TABLE "programs" ADD "major_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "syllabuses" ADD "course_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD "approve_timeline" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD "version_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD "version" integer NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be59e0dee1698551f2f0d292a0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_684f0090217e79c93db9f0838b"`,
    );
    await queryRunner.query(`DROP TABLE "course_group_closure"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cea0b45a54f00133785f90dbd8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74120d92ea4db86618e6d386c0"`,
    );
    await queryRunner.query(`DROP TABLE "course_group_courses_syllabuses"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b25fc1f0cd9db841c1a65e3efe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_db87eedde3e37bd38bba25f73a"`,
    );
    await queryRunner.query(
      `DROP TABLE "syllabuses_prerequisite_courses_syllabuses"`,
    );
    await queryRunner.query(`DROP TABLE "course_group"`);
    await queryRunner.query(`DROP TABLE "approval_requests"`);
    await queryRunner.query(
      `DROP TYPE "public"."approval_requests_entity_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD CONSTRAINT "FK_891d1b96e28c54f545e62be298f" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_8576681f320398f678310a996f1" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
