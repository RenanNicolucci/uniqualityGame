/*
  Warnings:

  - You are about to drop the column `answerId` on the `CorrectAnswers` table. All the data in the column will be lost.
  - Added the required column `answerValue` to the `CorrectAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CorrectAnswers" DROP CONSTRAINT "CorrectAnswers_answerId_fkey";

-- AlterTable
ALTER TABLE "CorrectAnswers" DROP COLUMN "answerId",
ADD COLUMN     "answerValue" TEXT NOT NULL;
