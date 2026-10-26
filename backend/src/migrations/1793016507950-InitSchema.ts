import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1793016507950 implements MigrationInterface {
    name = 'InitSchema1793016507950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question_text" character varying NOT NULL, "options" jsonb NOT NULL, "quiz_id" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "time_to_read" integer NOT NULL, "time_to_pass" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_lesson_progress" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "lesson_id" integer NOT NULL, "is_completed" boolean NOT NULL DEFAULT true, "completed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d52c2d4b5f26e61b3169d3d01a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_quiz_progress" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "quiz_id" integer NOT NULL, "grade_12" smallint NOT NULL, "score" double precision NOT NULL DEFAULT '0', "raw_score" smallint NOT NULL, "max_score" smallint NOT NULL, "completed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9ea069b693effb2bee885ba53cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name_and_surname" character varying, "password" character varying, "hashedRefreshToken" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lesson_main_media_type_enum" AS ENUM('PRESENTATION', 'VIDEO', 'NONE')`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "goal" text NOT NULL, "content" text NOT NULL, "main_media_type" "public"."lesson_main_media_type_enum" NOT NULL DEFAULT 'NONE', "main_media_url" character varying, "additional_resources" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "edited_at" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, "quiz_id" integer, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_46b3c125e02f7242662e4ccb307" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_77b1639ed2fe062cb1d9f366df5" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "FK_5ce08039490cd0e619ae9560519" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "FK_4427002dcf362d61def4791adee" FOREIGN KEY ("lesson_id") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quiz_progress" ADD CONSTRAINT "FK_bb561df87e4fbf6ac1def9b30c6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quiz_progress" ADD CONSTRAINT "FK_53d4929194d6f0fc295bdf5f680" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_9dd8735c7c5556daac856978933" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_0198152db1410e930a22df67aba" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_0198152db1410e930a22df67aba"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_9dd8735c7c5556daac856978933"`);
        await queryRunner.query(`ALTER TABLE "user_quiz_progress" DROP CONSTRAINT "FK_53d4929194d6f0fc295bdf5f680"`);
        await queryRunner.query(`ALTER TABLE "user_quiz_progress" DROP CONSTRAINT "FK_bb561df87e4fbf6ac1def9b30c6"`);
        await queryRunner.query(`ALTER TABLE "user_lesson_progress" DROP CONSTRAINT "FK_4427002dcf362d61def4791adee"`);
        await queryRunner.query(`ALTER TABLE "user_lesson_progress" DROP CONSTRAINT "FK_5ce08039490cd0e619ae9560519"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_77b1639ed2fe062cb1d9f366df5"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_46b3c125e02f7242662e4ccb307"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TYPE "public"."lesson_main_media_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_quiz_progress"`);
        await queryRunner.query(`DROP TABLE "user_lesson_progress"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}
