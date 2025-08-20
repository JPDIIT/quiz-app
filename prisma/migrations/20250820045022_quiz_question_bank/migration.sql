/*
  Warnings:

  - You are about to drop the `Rel_Quiz_Quest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quizId` to the `QuestionBank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionBank" ADD COLUMN     "quizId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rel_Quiz_Quest";

-- AddForeignKey
ALTER TABLE "QuestionBank" ADD CONSTRAINT "QuestionBank_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
