import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface IBody {
  codificacao: boolean;
  contrarotuloDiferenteDoRotulo: boolean;
  embalagemFurada: boolean;
  rotulo: boolean;
  tampaDeslocada: boolean;
  vazamento: boolean;
  frascoAmassado: boolean;
  tampaQuebrada: boolean;
  vazamentoSelagemHorizontal: boolean;
  vazamentoSelagemVertical: boolean;
  product: string;
  userId: string;
}

// eslint-disable-next-line import/no-anonymous-default-export, consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const answers = await prisma.answers.findMany();
      return res.json(answers);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const {
      vazamentoSelagemHorizontal,
      vazamentoSelagemVertical,
      frascoAmassado,
      tampaQuebrada,
      codificacao,
      rotulo,
      tampaDeslocada,
      vazamento,
      embalagemFurada,
      contrarotuloDiferenteDoRotulo,
      product,
      userId,
    }: IBody = req.body;

    if (!product) {
      return res
        .status(500)
        .json({ error: "Campo 'product' obrigatório não preenchido." });
    }

    const hasData = await prisma.answers.findMany({
      where: {
        userId: parseInt(userId, 10),
        productId: parseInt(product, 10),
      },
    });

    if (hasData.length) {
      return res.status(500).json({
        error: 'Usuário já possui respostas cadastradas para este produto',
      });
    }

    const allKeys = Object.keys({
      codificacao,
      contrarotuloDiferenteDoRotulo,
      embalagemFurada,
      rotulo,
      tampaDeslocada,
      frascoAmassado,
      tampaQuebrada,
      vazamento,
      vazamentoSelagemHorizontal,
      vazamentoSelagemVertical,
    });

    const answerData = allKeys.map((key) => ({
      key,
      productId: parseInt(product, 10),
      userId: parseInt(userId, 10),
      value: req.body[key] as boolean,
    }));

    const countValues = allKeys
      .map((item) => ({
        key: item,
        value: req.body[item],
      }))
      .filter((item) => item.value)
      .map((item) => item.key);

    try {
      await prisma.answers.createMany({
        data: answerData,
      });

      await prisma.floatAnswers.updateMany({
        where: {
          answerValue: {
            in: countValues,
          },
        },
        data: { quantity: { increment: 1 } },
      });

      return res
        .status(200)
        .json({ message: 'Valores atualizados com sucesso.' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.answers.deleteMany({});

      return res.status(200).json({
        message: 'Quantidade zerada com sucesso para todos os produtos.',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
