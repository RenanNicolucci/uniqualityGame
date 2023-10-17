/*
  Warnings:

  - You are about to drop the column `wrong` on the `Answers` table. All the data in the column will be lost.
  - Added the required column `value` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "wrong",
ADD COLUMN     "value" BOOLEAN NOT NULL;
