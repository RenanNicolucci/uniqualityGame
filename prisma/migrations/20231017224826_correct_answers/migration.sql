-- CreateTable
CREATE TABLE "CorrectAnswers" (
    "id" SERIAL NOT NULL,
    "product" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "CorrectAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CorrectAnswers" ADD CONSTRAINT "CorrectAnswers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
