-- AlterTable
CREATE SEQUENCE scores_id_seq;
ALTER TABLE "Scores" ADD COLUMN     "quizId" INTEGER,
ALTER COLUMN "id" SET DEFAULT nextval('scores_id_seq');
ALTER SEQUENCE scores_id_seq OWNED BY "Scores"."id";
