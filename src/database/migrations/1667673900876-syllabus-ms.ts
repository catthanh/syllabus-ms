import { MigrationInterface, QueryRunner } from "typeorm";

export class syllabusMs1667673900876 implements MigrationInterface {
    name = 'syllabusMs1667673900876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reference_materials" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "language" character varying NOT NULL, "release_year" integer NOT NULL, "material_type" character varying NOT NULL, CONSTRAINT "PK_7b2e964b54b65cf83b7bf235b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_departments_users" ("id" SERIAL NOT NULL, "role_id" integer NOT NULL, "user_id" integer NOT NULL, "department_id" integer NOT NULL, CONSTRAINT "PK_3872d507ece925908451d13db64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departments" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."syllabuses_course_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "syllabuses" ("id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "course_code" character varying NOT NULL, "course_credit" integer NOT NULL, "course_time_distribution" jsonb NOT NULL, "course_type" "public"."syllabuses_course_type_enum" NOT NULL, "course_target" character varying NOT NULL, "outcome_standard" jsonb NOT NULL, "course_summary" character varying NOT NULL, "course_content" character varying NOT NULL, "teaching_schedule" jsonb NOT NULL, "detailed_teaching_schedule" jsonb NOT NULL, "course_policy" character varying NOT NULL, "midterm_assessment" jsonb NOT NULL, "final_assessment" jsonb NOT NULL, "assessment_criteria" character varying NOT NULL, "midterm_assessment_schedule" jsonb NOT NULL, "final_assessment_schedule" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "primary_lecturer_id" integer, "prerequisite_id" integer, "department_id" integer, CONSTRAINT "PK_a001774ce22da984e32ce70dec4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "syllabuses_other_lecturers_users" ("syllabuses_id" integer NOT NULL, "users_id" integer NOT NULL, CONSTRAINT "PK_838ef080523635ac7fd6b96605d" PRIMARY KEY ("syllabuses_id", "users_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4badecb402337cb3bc996c183" ON "syllabuses_other_lecturers_users" ("syllabuses_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4dd8fce66cb054f7cb459c335e" ON "syllabuses_other_lecturers_users" ("users_id") `);
        await queryRunner.query(`CREATE TABLE "syllabuses_reference_materials_reference_materials" ("syllabuses_id" integer NOT NULL, "reference_materials_id" integer NOT NULL, CONSTRAINT "PK_62263217ac62aeacaa1d7acc21b" PRIMARY KEY ("syllabuses_id", "reference_materials_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_002bc857c49b998d59aba17d97" ON "syllabuses_reference_materials_reference_materials" ("syllabuses_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e179d8f4aa5c7e544290f63272" ON "syllabuses_reference_materials_reference_materials" ("reference_materials_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD CONSTRAINT "FK_14acef8ffdd18cb1102f3dabbdd" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD CONSTRAINT "FK_28b3f75811a99f10c77e1efe6b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" ADD CONSTRAINT "FK_b1da4f99c478b89fdb4b467f7fb" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_1e5250be79b85b99507264ac328" FOREIGN KEY ("primary_lecturer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_fecf419808fc9eadb98e70572ec" FOREIGN KEY ("prerequisite_id") REFERENCES "syllabuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses" ADD CONSTRAINT "FK_2e0045b8c0288cdb59852f8a957" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "syllabuses_other_lecturers_users" ADD CONSTRAINT "FK_c4badecb402337cb3bc996c1838" FOREIGN KEY ("syllabuses_id") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "syllabuses_other_lecturers_users" ADD CONSTRAINT "FK_4dd8fce66cb054f7cb459c335ef" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "syllabuses_reference_materials_reference_materials" ADD CONSTRAINT "FK_002bc857c49b998d59aba17d972" FOREIGN KEY ("syllabuses_id") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "syllabuses_reference_materials_reference_materials" ADD CONSTRAINT "FK_e179d8f4aa5c7e544290f63272c" FOREIGN KEY ("reference_materials_id") REFERENCES "reference_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "syllabuses_reference_materials_reference_materials" DROP CONSTRAINT "FK_e179d8f4aa5c7e544290f63272c"`);
        await queryRunner.query(`ALTER TABLE "syllabuses_reference_materials_reference_materials" DROP CONSTRAINT "FK_002bc857c49b998d59aba17d972"`);
        await queryRunner.query(`ALTER TABLE "syllabuses_other_lecturers_users" DROP CONSTRAINT "FK_4dd8fce66cb054f7cb459c335ef"`);
        await queryRunner.query(`ALTER TABLE "syllabuses_other_lecturers_users" DROP CONSTRAINT "FK_c4badecb402337cb3bc996c1838"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_2e0045b8c0288cdb59852f8a957"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_fecf419808fc9eadb98e70572ec"`);
        await queryRunner.query(`ALTER TABLE "syllabuses" DROP CONSTRAINT "FK_1e5250be79b85b99507264ac328"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP CONSTRAINT "FK_b1da4f99c478b89fdb4b467f7fb"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP CONSTRAINT "FK_28b3f75811a99f10c77e1efe6b0"`);
        await queryRunner.query(`ALTER TABLE "roles_departments_users" DROP CONSTRAINT "FK_14acef8ffdd18cb1102f3dabbdd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e179d8f4aa5c7e544290f63272"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_002bc857c49b998d59aba17d97"`);
        await queryRunner.query(`DROP TABLE "syllabuses_reference_materials_reference_materials"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dd8fce66cb054f7cb459c335e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4badecb402337cb3bc996c183"`);
        await queryRunner.query(`DROP TABLE "syllabuses_other_lecturers_users"`);
        await queryRunner.query(`DROP TABLE "syllabuses"`);
        await queryRunner.query(`DROP TYPE "public"."syllabuses_course_type_enum"`);
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "roles_departments_users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "reference_materials"`);
    }

}
