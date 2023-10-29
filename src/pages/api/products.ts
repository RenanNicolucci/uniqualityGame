import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
