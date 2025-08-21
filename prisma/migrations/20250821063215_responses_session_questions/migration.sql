/*
  Warnings:

  - You are about to drop the `Rel_Response_Question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questId` to the `Responses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `Responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Responses" ADD COLUMN     "questId" INTEGER NOT NULL,
ADD COLUMN     "session" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rel_Response_Question";

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_questId_fkey" FOREIGN KEY ("questId") REFERENCES "QuestionBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
