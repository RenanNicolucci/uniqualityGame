// pages/api/exemplo.js

import db from "../../database/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    db.all("SELECT * FROM answers", (err: any, rows: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(rows);
    });
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

    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      Object.keys(updateValues).forEach((key: string) => {
        //@ts-ignore
        if (updateValues[key]) {
          db.run(
            `UPDATE answers SET quantity = quantity + 1 WHERE product = ? AND key = ?`,
            [product, key],
            (err) => {
              if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({ error: err.message });
              }
            }
          );
        }
      });

      db.run("COMMIT", (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res
          .status(200)
          .json({ message: "Valores atualizados com sucesso." });
      });
    });
  }
};
