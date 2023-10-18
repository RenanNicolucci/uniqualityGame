import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { productID } = req.query;
      const answers = await prisma.answers.findMany({
        where: { product: parseInt(productID as string, 10) },
      });
      return res.json(answers);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
