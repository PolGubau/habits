//NEXT.js endpoint for getting all expenses for a user

import type { NextApiRequest, NextApiResponse } from "next";
import { IExpense } from "src/pages/expenses/utils/initialStates";
import { conn } from "src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = 'SELECT * FROM "public"."expenses" WHERE "userID" = 1;';
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      try {
        const { name, amount, date, time, category, shop } = body;

        const dateTime = new Date(`${date} ${time}`);

        const query =
          'INSERT INTO "public"."expenses" (name, amount, "date", "category", "shop", "userID") VALUES ($1, $2, $3, $4, $5, 1) RETURNING *;';

        console.log(body);

        const response = await conn.query(query, [
          name,
          amount,
          dateTime,
          category,
          shop,
        ]);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }
  }
}
