/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    host: "postgresql-pol.alwaysdata.net",
    database: "pol_expenses",
    port: 5432,
    user: "pol",
    password: "gubaupol2002",
  });
}
export { conn };
