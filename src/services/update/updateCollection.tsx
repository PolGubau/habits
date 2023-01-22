import { CollectionInterface } from 'src/interfaces/Collection'
import { bigAlert } from 'src/utils/notifications'

export const updateCollection = (
  endpoint: string,
  newCollection: CollectionInterface
) => {
  const { title, tags, likes, ID } = newCollection

  fetch(`${endpoint}/${ID}`, {
    method: 'PUT',

    body: JSON.stringify({ title, tags, likes, ID })
  })
    .then(async (res) => await res.json())
    .then((data) => {
      const { rowCount } = data
      if (rowCount > 0) {
        console.log('Collection updated!')
        void bigAlert('Nice!', 'Like added to quest!', 'success')
      }
    })
    .catch((err) => console.log(err))
}
