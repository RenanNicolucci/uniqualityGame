import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { userId, productID } = req.query;

      const answers = await prisma.answers.findMany({
        where: {
          userId: parseInt(userId as string, 10),
          product: parseInt(productID as string, 10),
        },
      });

      const correctAnswers = (
        await prisma.correctAnswers.findMany({
          where: {
            product: parseInt(productID as string, 10),
          },
        })
      ).map((answer) => answer.answerValue);

      const result = answers.reduce(
        (acc: any, answer) => {
          if (correctAnswers.includes(answer.key) && answer.value) {
            acc.correctAnswers.push(answer);
          } else {
            acc.wrongAnswers.push(answer);
          }
          return acc;
        },
        { correctAnswers: [], wrongAnswers: [] },
      );

      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { userId } = req.query;

      await prisma.answers.delete({
        where: {
          id: parseInt(userId as string, 10),
        },
      });

      return res.status(200).json({
        message: 'Quantidade zerada com sucesso para todos os produtos.',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
