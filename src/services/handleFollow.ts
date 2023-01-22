import UserInterface from 'src/interfaces/User'
import PATH from 'src/utils/path'
import { updateUser } from './update/updateUser'

export const handleFollow = async (Profiled: UserInterface, Loged: UserInterface, isFollowed: boolean, setIsFollowed: any) => {
  const newUserLoged = Loged
  const newUserProfiled = Profiled

  // if following and followers array are stringified, we need to parse them to arrays
  if (typeof newUserLoged.following === 'string') {
    newUserLoged.following = JSON.parse(newUserLoged.following)
  }
  if (typeof newUserLoged.followers === 'string') {
    newUserLoged.followers = JSON.parse(newUserLoged.followers)
  }
  if (typeof newUserProfiled.followers === 'string') {
    newUserProfiled.followers = JSON.parse(newUserProfiled.followers)
  }
  if (typeof newUserProfiled.following === 'string') {
    newUserProfiled.following = JSON.parse(newUserProfiled.following)
  }

  // if followers or following is empty, create an empty array

  if (newUserLoged.following === null) {
    newUserLoged.following = []
  }
  if (newUserProfiled.followers === null) {
    newUserProfiled.followers = []
  }

  // lets use isFollowed to know if we are following or unfollowing
  if (isFollowed) {
    // we need to stop following
    newUserLoged.following = newUserLoged.following.filter((user: string) => user !== Profiled.ID)
    newUserProfiled.followers = newUserProfiled.followers.filter((user: string) => user !== Loged.ID)
  } else {
    // we need to follow
    newUserLoged.following.push(Profiled.ID)
    newUserProfiled.followers.push(Loged.ID)
  }

  window.localStorage.setItem('user', JSON.stringify(newUserLoged))

  updateUser(PATH.API.USER_BY_ID, newUserLoged)
  updateUser(PATH.API.USER_BY_ID, newUserProfiled)

  return setIsFollowed(!isFollowed)
}
