import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import UserInterface from 'src/interfaces/User'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query, body } = req
  const userNameReq = query.userName

  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Users" WHERE "userName" = $1'
        const values = [userNameReq]
        const result = await conn.query(query, values)

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'not found' })
        }
        return res.json(result.rows[0])
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    case 'PUT':{
      if (!body) {
        return res.status(400).json({ error: 'Missing body' })
      }
      // take the user from the body and update it
      const { userName, email, password, followers, following, collections_done: collectionDone, role, image, liked } = body
      console.log('BODY received by backend: ', body)

      const query = 'UPDATE public."Users" SET "email" = $2, "password" = $3, "followers" = $4, "following" = $5, "collections_done" = $6, "role" = $7, "image" = $8, "liked" =$9 WHERE "userName" = $1'

      const values = [userName, email, password, JSON.stringify(followers), JSON.stringify(following), JSON.stringify(collectionDone), role, image, JSON.stringify(liked)]
      await conn.query(query, values).then((result: { rows: Array<object | UserInterface> }) => {
        return res.json(result)
      })

      break }

    //
    case 'DELETE':
      try {
        const query = 'DELETE FROM public."Users" WHERE userName = $1 RETURNING *'
        const values = [userNameReq]

        const response = await conn.query(query, values)
        return res.json(response)
      } catch (error) {
        return res.status(400).json({ error })
      }

    //
    default:
      return res.status(404).json({ error: 'not found' })
  }
}
