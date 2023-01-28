/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query =
          'SELECT "id", date, "username", password FROM public."users";';
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      if (!body) {
        return res.status(400).json({ error: "Missing body" });
      }
      const content = JSON.parse(body);
      try {
        const { username, email, password } = content;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const query = `INSERT INTO public."users"(
          "username", password, email)
          VALUES ($1, $2, $3)
            RETURNING *;`;
        const values = [username, hashPassword, email];

        const responsePOST = await conn.query(query, values);

        const user = responsePOST.rows;

        return res.status(200).json({ user, success: true });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
      }

    default:
      return res.status(404).json({ error: "not found" });
  }
}
