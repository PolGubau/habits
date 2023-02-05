import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

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
        return res.json(response.rows);
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

        const dateTime = new Date(`${date} ${time}`);

        const query =
          'INSERT INTO "public"."expenses" ("name", "amount","price", "date","userID", "category", "shop","isMinus","currency" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *;';

        const response = await conn.query(query, [
          name,
          amount,
          price,
          dateTime,
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
