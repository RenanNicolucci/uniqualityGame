import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const answers = await prisma.answers.findMany();
      return res.json(answers);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "POST") {
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
    } = req.body;

    if (!product) {
      return res
        .status(500)
        .json({ error: "Campo 'product' obrigatório não preenchido." });
    }

    const updateValues = {
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
    };

    await prisma.$transaction(async (prisma) => {
      for (const key in updateValues) {
        //@ts-ignore
        if (updateValues[key]) {
          await prisma.answers.updateMany({
            where: {
              product,
              key,
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          });
        }
      }
    });

    try {
      return res
        .status(200)
        .json({ message: "Valores atualizados com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.answers.updateMany({
        data: {
          quantity: 0,
        },
      });

      return res
        .status(200)
        .json({
          message: "Quantidade zerada com sucesso para todos os produtos.",
        });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};
