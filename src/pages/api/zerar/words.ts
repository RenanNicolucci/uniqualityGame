import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      await prisma.floatAnswers.deleteMany({});

      return res.status(200).json({
        message: 'Quantidade zerada com sucesso para todas as palavras.',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
