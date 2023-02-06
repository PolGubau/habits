//NEXT.js endpoint for getting all expenses for a user

import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = `SELECT * FROM "public"."expenses" WHERE "id" = ${id}`;
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "PUT":
      try {
        const {
          id,
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
          'UPDATE "public"."expenses" SET "name" = $1, "amount" = $2, "price" = $3, "date" = $4, "time" = $5, "category" = $6, "shop" = $7, "isMinus" = $8, "userID" = $9, "currency" = $10 WHERE "id" = $11 RETURNING *;';
        const response = await conn.query(query, [
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
          id,
        ]);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "DELETE":
      try {
        const query =
          'DELETE FROM "public"."expenses" WHERE "id" = $1 RETURNING *;';
        await conn.query(query, [id]).then(() => {
          return res.status(204).json({});
        });
      } catch (error) {
        return res.status(400).json({ error });
      }
  }
}
