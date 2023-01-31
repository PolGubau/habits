//NEXT.js endpoint for getting all expenses for a user

import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = 'SELECT * FROM "public"."food" WHERE "userID" = 1;';
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      try {
        const { name, ingredients, location, date, time } = body;
        console.log(body);

        const dateTime = new Date(`${date} ${time}`);
        const userID = 1;

        const query =
          'INSERT INTO "public"."food" ("name", "location", "date","mainIngredients", "userID") VALUES ($1, $2, $3, $4, $5) RETURNING *;';

        const response = await conn.query(query, [
          name,
          location,
          dateTime,
          ingredients,
          userID,
        ]);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }
  }
}
