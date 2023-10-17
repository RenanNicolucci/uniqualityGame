import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res
        .status(500)
        .json({ error: "Campo 'name' obrigatório não preenchido." });
    }
    const newUser = await prisma.user.create({ data: { name } });

    try {
      return res.status(200).json(newUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.user.deleteMany({});

      return res.status(200).json({
        message: 'Quantidade zerada com sucesso para todos os usuarios.',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
