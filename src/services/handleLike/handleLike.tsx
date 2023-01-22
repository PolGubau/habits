import { CollectionInterface } from 'src/interfaces/Collection'
import UserInterface from 'src/interfaces/User'
import { bigAlert } from 'src/utils/notifications'
import PATH from 'src/utils/path'
import { updateCollection } from '../update/updateCollection'
import { updateUser } from '../update/updateUser'

export const handleLike = (
  userLoged: UserInterface,
  collection: CollectionInterface,
  setLiked: any,
  setLikes: any
) => {
  let { ID: CollectionID, likes: CollectionLikes } = collection
  if (!CollectionLikes) CollectionLikes = 0
  console.log('USER: ', userLoged)

  const likedArray = userLoged.liked || []

  // handling errors
  if (userLoged.error) {
    void bigAlert(
      'Oupss...',
      'You can\'t like a quest if you are not logged in!',
      'error'
    )
    return
  }
  if (!CollectionID) {
    void bigAlert('Oupss...', 'A problem happened here, please try again!', 'error')
    return
  }

  let isNowLiked = 0

  // TODO 1: update the user liked array in the database
  // 1.1: check if the user liked the quest before

  if (likedArray.includes(CollectionID)) {
    // the user already liked this collection, we need to remove it from the liked array
    const index = likedArray.indexOf(CollectionID)
    likedArray.splice(index, 1)
    setLiked(false)
    setLikes(CollectionLikes - 1)
    isNowLiked = -1
  } else {
    // the user didn't like this collection, we need to add it to the liked array
    likedArray.push(CollectionID)
    setLiked(true)
    setLikes(CollectionLikes + 1)
    isNowLiked = 1
  }

  const newUser = { ...userLoged, liked: likedArray }

  // if the user liked the collection, we need to add 1 to the likes number, if not, we need to remove 1
  const newLikes = CollectionLikes + isNowLiked
  const newCollection = { ...collection, likes: newLikes }

  localStorage.setItem('user', JSON.stringify(newUser))
  updateUser(PATH.API.USER_BY_ID, newUser)
  updateCollection(PATH.API.COLLECTION_BY_ID, newCollection)
}
