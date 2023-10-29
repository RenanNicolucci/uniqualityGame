/*
  Warnings:

  - You are about to drop the column `gameId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_gameId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "gameId";

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "FloatAnswers" (
    "id" SERIAL NOT NULL,
    "answerValue" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "FloatAnswers_pkey" PRIMARY KEY ("id")
);
