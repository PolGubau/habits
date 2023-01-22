/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import PATH from 'src/utils/path'
import useSWR from 'swr'
import { offlineCollections } from 'src/utils/offlineData'
const getData = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}

const chooseOneFromArray = (array: any) => {
  return array[Math.floor(Math.random() * array.length)]
}
export default function randomCollection () {
  const allCollectionsEndpoint = `${PATH.API.ALL_COLLECTIONS}`
  try {
    const { data } = useSWR(allCollectionsEndpoint, getData)
    return chooseOneFromArray(data)
  } catch {
    const data = offlineCollections
    return chooseOneFromArray(data)
  }
}
