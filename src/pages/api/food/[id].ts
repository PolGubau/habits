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
        const { name, amount, date, time, category, shop } = body;

        const dateTime = new Date(`${date} ${time}`);

        const query =
          'UPDATE "public"."expenses" SET name = $1, amount = $2, "date" = $3, "category" = $4, "shop"=$5 WHERE "id" = $6 RETURNING *;';
        const response = await conn.query(query, [
          name,
          amount,
          dateTime,
          category,
          shop,
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
