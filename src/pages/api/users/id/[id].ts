/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | object>
) {
  const { method, query, body } = req;
  const paramID = query.id as string;
  const id = Number(paramID) || 0;

  //
  switch (method) {
    case "GET":
      try {
        const query = 'SELECT * FROM public."users" WHERE "id" = $1';
        const values = [id];
        const result = await conn.query(query, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "not found" });
        }
        return res.json(result.rows[0]);
      } catch (error) {
        return res.status(400).json({ error });
      }

    //
    case "PUT": {
      if (!body) {
        return res.status(400).json({ error: "Missing body" });
      }
      // take the user from the body and update it
      const {
        userName,
        email,
        password,
        followers,
        following,
        collections_done: collectionsDone,
        role,
        image,
        liked,
        ID,
      } = body;

      const query =
        'UPDATE public."users" SET "userName" = $1, "email" = $2, "password" = $3, "followers" = $4, "following" = $5, "collections_done" = $6, "role" = $7, "image" = $8, "liked" =$9 WHERE "id" = $10';

      const values = [userName, email, password];
      await conn
        .query(query, values)
        .then((result: { rows: Array<object | any> }) => {
          return res.json(result);
        });

      break;
    }

    //
    case "DELETE":
      try {
        const query = 'DELETE FROM public."users" WHERE "id" = $1 RETURNING *';
        const values = [id];

        const response = await conn.query(query, values);
        return res.json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }

    //
    default:
      return res.status(404).json({ error: "not found" });
  }
}
