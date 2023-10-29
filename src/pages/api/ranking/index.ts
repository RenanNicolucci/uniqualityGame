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
          product: true,
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
            product: answer.product,
            answers: [],
          };
        }

        answersByUser[userId].answers.push(answer);
      }
      const formattedResults = await Promise.all(
        Object.values(answersByUser).map(async (result: any) => {
          const correctAnswerKeys = await prisma.correctAnswers
            .findMany({
              where: {
                productId: result.product.id,
              },
            })
            .then((correctAnswers) =>
              correctAnswers.map((answer) => answer.answerValue),
            );

          const filteredAnswers = result.answers
            .filter((answer: any) => {
              return correctAnswerKeys.includes(answer.key) && answer.value;
            })
            .map((item: any) => ({
              key: item.key,
              product: item.product,
              value: item.value,
            }));

          return {
            user: { name: result.user.name, id: result.user.id },
            startTime: result.user.createdAt,
            finalTime: result.answers[0].createdAt,
            correctAnswers: filteredAnswers,
          };
        }),
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
