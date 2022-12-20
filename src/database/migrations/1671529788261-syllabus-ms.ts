import { MigrationInterface, QueryRunner } from "typeorm";

export class syllabusMs1671529788261 implements MigrationInterface {
    name = 'syllabusMs1671529788261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."approval_requests_request_type_enum" AS ENUM('create', 'update', 'hide')`);
        await queryRunner.query(`ALTER TABLE "approval_requests" ADD "request_type" "public"."approval_requests_request_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "approval_requests" ADD "request" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "approval_requests" DROP COLUMN "request"`);
        await queryRunner.query(`ALTER TABLE "approval_requests" DROP COLUMN "request_type"`);
        await queryRunner.query(`DROP TYPE "public"."approval_requests_request_type_enum"`);
    }

}
