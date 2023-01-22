export default function refreshLikesFromUser (likeArray: any) {
  // we will take the user from the local storage and we will upload it with the props
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')
  user.likes = likeArray
  const jsonUser = JSON.stringify(user)
  localStorage.setItem('user', jsonUser)
}
