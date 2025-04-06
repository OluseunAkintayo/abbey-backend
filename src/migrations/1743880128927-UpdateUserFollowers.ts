import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserFollowers1743880128927 implements MigrationInterface {
    name = 'UpdateUserFollowers1743880128927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "followers" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "following" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "following"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "followers"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
    }

}
