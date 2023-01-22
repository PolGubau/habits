import { useEffect, useState } from 'react'
import UserInterface from 'src/interfaces/User'

export default function getUserFromLocalStorage () {
  interface getUserFromLocalStorageInterface {
    status: number
    user: UserInterface | undefined
  }
  const [con, setCon] = useState<getUserFromLocalStorageInterface>({
    status: 0,
    user: undefined
  })

  // we need to take the user from localstorage and return it with an status code
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userRaw = JSON.parse(user)

      const liked = JSON.parse(userRaw.liked)
      const followers = JSON.parse(userRaw.followers)
      const following = JSON.parse(userRaw.following)
      const collections_done = JSON.parse(userRaw.collections_done)

      const newUser: UserInterface = {
        ...userRaw,
        followers,
        following,
        liked,
        collections_done
      }
      setCon({
        status: 1,
        user: newUser
      })
    } else {
      setCon({
        status: -1,
        user: undefined
      })
    }
  }, [])
  return { con }
}
