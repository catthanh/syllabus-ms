import { MigrationInterface, QueryRunner } from "typeorm";

export class syllabusMs1669894321406 implements MigrationInterface {
    name = 'syllabusMs1669894321406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP CONSTRAINT "FK_14acef8ffdd18cb1102f3dabbdd"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_fecf419808fc9eadb98e70572ec"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`CREATE TABLE "majors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "department_id" integer, CONSTRAINT "PK_9d82cf80fe0593040e50ccb297e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "programs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "major_id" integer, CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meeting_notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "place" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24248684e8ac266a4bc2ba64475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "syllabuses_prerequisite_courses_courses" ("syllabuses_id" integer NOT NULL, "courses_id" integer NOT NULL, CONSTRAINT "PK_cfdc6756672fc7a51062f45bdb2" PRIMARY KEY ("syllabuses_id", "courses_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_688d3b550d0fc5148365048cd2" ON "syllabuses_prerequisite_courses_courses" ("syllabuses_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_18ab7e8f27fe8af8db828ef14c" ON "syllabuses_prerequisite_courses_courses" ("courses_id") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "course_name"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "course_code"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "prerequisite_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "version_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "approve_timeline" jsonb NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."syllabuses_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "status" "public"."syllabuses_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "is_hidden" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "course_id" integer`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD "role" character varying NOT NULL DEFAULT 'STUDENT'`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_3a4932d07fd4b560a95fc6b2073" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_891d1b96e28c54f545e62be298f" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_8576681f320398f678310a996f1" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses_prerequisite_courses_courses" ADD CONSTRAINT "FK_688d3b550d0fc5148365048cd24" FOREIGN KEY ("syllabuses_id") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "syllabuses_prerequisite_courses_courses" ADD CONSTRAINT "FK_18ab7e8f27fe8af8db828ef14c7" FOREIGN KEY ("courses_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabuses_prerequisite_courses_courses" DROP CONSTRAINT "FK_18ab7e8f27fe8af8db828ef14c7"`);
        await queryRunner.query(`ALTER TABLE "syllabuses_prerequisite_courses_courses" DROP CONSTRAINT "FK_688d3b550d0fc5148365048cd24"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_8576681f320398f678310a996f1"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_891d1b96e28c54f545e62be298f"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_3a4932d07fd4b560a95fc6b2073"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD "role" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "is_hidden"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."syllabuses_status_enum"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "approve_timeline"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "version_name"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "prerequisite_id" integer`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "course_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD "course_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18ab7e8f27fe8af8db828ef14c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_688d3b550d0fc5148365048cd2"`);
        await queryRunner.query(`DROP TABLE "syllabuses_prerequisite_courses_courses"`);
        await queryRunner.query(`DROP TABLE "meeting_notes"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "programs"`);
        await queryRunner.query(`DROP TABLE "majors"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_fecf419808fc9eadb98e70572ec" FOREIGN KEY ("prerequisite_id") REFERENCES "syllabuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD CONSTRAINT "FK_14acef8ffdd18cb1102f3dabbdd" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
