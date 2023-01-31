import type { NextApiRequest, NextApiResponse } from "next";
import { USER_CODES } from "src/Services/ManageAccounts/CreateNewUserFunctions";
const bcrypt = require("bcryptjs");

import { conn } from "src/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { username, password } = req.query;
        const query =
          'SELECT id, username, password, email FROM public."users" WHERE "username" = $1;';
        const { rows } = await conn.query(query, [username]);

        const passwordEncrypted = rows[0].password;
        const passwordMatch = await bcrypt.compare(password, passwordEncrypted);

        //
        const data = {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
        };

        if (rows.length === 0) {
          return res.json(USER_CODES.USER_NOT_FOUND);
        }
        if (!passwordMatch) {
          return res.json(USER_CODES.WRONG_PASSWORD);
        }
        return res.json({ data, success: true });
      } catch (error) {
        return res.json({ error: USER_CODES.USER_NOT_FOUND });
      }
  }
}
