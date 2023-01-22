import UserInterface from 'src/interfaces/User'
import { notificacionTop } from 'src/utils/notifications'

export const updateUser = (endpoint: string, userUpdated: UserInterface) => {
  const {
    ID,
    userName,
    email,
    liked,
    password,
    followers,
    following,
    role,
    image,
    collections_done
  }: UserInterface = userUpdated

  fetch(`${endpoint}/${userUpdated.ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName,
      email,
      password,
      followers,
      following,
      collections_done,
      role,
      image,
      liked,
      ID
    })
  })
    .then(async (res) => await res.json())
    .then((data) => {
      const { rowCount } = data
      if (rowCount > 0) {
        notificacionTop('success', 'Saved with success!')
      }
    })
    .catch((err) => console.log(err))
}
