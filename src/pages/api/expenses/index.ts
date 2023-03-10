import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";
import { IExpense } from "src/utils/initialStates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;
  const { userID } = query;

  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM "public"."expenses" WHERE "userID" = $1;`;
        const response = await conn.query(query, [userID]);

        //
        const expenses = response.rows;

        const expensesPriceWell = expenses.map((expense: IExpense) => {
          const { price } = expense;
          const newPrice = price / 100;
          return { ...expense, price: newPrice };
        });
        return res.json(expensesPriceWell);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      try {
        const {
          name,
          amount,
          price,
          date,
          time,
          category,
          shop,
          isMinus,
          userID,
          currency,
        } = body;

        const query =
          'INSERT INTO "public"."expenses" ("name", "amount","price", "date","time", "userID", "category", "shop", "isMinus", "currency" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';

        const response = await conn.query(query, [
          name,
          amount,
          price,
          date,
          time,
          userID,
          category,
          shop,
          isMinus,
          currency,
        ]);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }
  }
}
