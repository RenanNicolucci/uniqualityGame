import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const allAnswers = await prisma.answers.findMany({
        include: {
          user: true,
        },
        orderBy: {
          userId: 'asc',
        },
      });

      const answersByUser: any = {};

      for (const answer of allAnswers) {
        const userId = answer.user.id;

        if (!answersByUser[userId]) {
          answersByUser[userId] = {
            user: answer.user,
            answers: [],
          };
        }

        answersByUser[userId].answers.push(answer);
      }

      const correctAnswers = (await prisma.correctAnswers.findMany()).map(
        (answer) => answer.answerValue,
      );

      const formattedResults = Object.values(answersByUser).map(
        (result: any) => {
          return {
            user: { name: result.user.name, id: result.user.id },
            startTime: result.user.createdAt,
            finalTime: result.answers[0].createdAt,
            correctAnswers: result.answers
              .filter((answer: any) => {
                return correctAnswers.includes(answer.key) && answer.value;
              })
              .map((item: any) => ({
                key: item.key,
                product: item.product,
                value: item.value,
              })),
            wrongAnswers: result.answers
              .filter((answer: any) => {
                return (
                  (!correctAnswers.includes(answer.key) && answer.value) ||
                  (correctAnswers.includes(answer.key) && !answer.value)
                );
              })
              .map((item: any) => ({
                key: item.key,
                product: item.product,
                value: item.value,
              })),
          };
        },
      );

      const sortByRanking = formattedResults.sort((a, b) => {
        // Compare primeiro com base no número de respostas corretas (maior length em correctAnswers primeiro)
        const correctAnswersLengthA = a.correctAnswers.length;
        const correctAnswersLengthB = b.correctAnswers.length;

        if (correctAnswersLengthA > correctAnswersLengthB) {
          return -1;
        }
        if (correctAnswersLengthA < correctAnswersLengthB) {
          return 1;
        }
        const startTimeA = new Date(a.startTime).getTime();
        const finalTimeA = new Date(a.finalTime).getTime();
        const startTimeB = new Date(b.startTime).getTime();
        const finalTimeB = new Date(b.finalTime).getTime();

        const timeDifferenceA = finalTimeA - startTimeA;
        const timeDifferenceB = finalTimeB - startTimeB;

        return timeDifferenceA - timeDifferenceB;
      });

      return res.json({ sortByRanking });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
