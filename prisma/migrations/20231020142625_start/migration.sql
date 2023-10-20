-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "product" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectAnswers" (
    "id" SERIAL NOT NULL,
    "product" INTEGER NOT NULL,
    "answerValue" TEXT NOT NULL,

    CONSTRAINT "CorrectAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
