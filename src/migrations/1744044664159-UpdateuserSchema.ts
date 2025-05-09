import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateuserSchema1744044664159 implements MigrationInterface {
    name = 'UpdateuserSchema1744044664159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "firstName" character varying(100), "lastName" character varying(100), "username" character varying(100) NOT NULL, "passwordHash" character varying NOT NULL, "bio" character varying, "picture" character varying, "lastLoginDate" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "followers" jsonb NOT NULL DEFAULT '[]', "following" jsonb NOT NULL DEFAULT '[]', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
