import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface IBody {
  codificacao: boolean;
  codificacaoFalhada: boolean;
  contrarotuloDiferenteDoRotulo: boolean;
  embalagemFurada: boolean;
  faltaDeCodificacao: boolean;
  rotuloComBolhas: boolean;
  rotuloDescolado: boolean;
  tampaDeslocada: boolean;
  vazamento: boolean;
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
      codificacao,
      codificacaoFalhada,
      contrarotuloDiferenteDoRotulo,
      embalagemFurada,
      faltaDeCodificacao,
      rotuloComBolhas,
      rotuloDescolado,
      tampaDeslocada,
      vazamento,
      vazamentoSelagemHorizontal,
      vazamentoSelagemVertical,
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
        product: parseInt(product, 10),
      },
    });

    if (hasData.length) {
      return res.status(500).json({
        error: 'Usuário já possui respostas cadastradas para este produto',
      });
    }

    const newData = Object.keys({
      codificacao,
      codificacaoFalhada,
      contrarotuloDiferenteDoRotulo,
      embalagemFurada,
      faltaDeCodificacao,
      rotuloComBolhas,
      rotuloDescolado,
      tampaDeslocada,
      vazamento,
      vazamentoSelagemHorizontal,
      vazamentoSelagemVertical,
    }).map((key) => ({
      key,
      product: parseInt(product, 10),
      userId: parseInt(userId, 10),
      value: req.body[key] as boolean,
    }));

    try {
      await prisma.answers.createMany({
        data: newData,
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
