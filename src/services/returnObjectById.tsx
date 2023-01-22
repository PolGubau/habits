import useSWR from 'swr'

const fetcher = async (url: string) => await fetch(url).then(async (res) => await res.json())

export default function returnObjectById (
  endPoint: string,
  ID: string | number
) {
  const { data, error } = useSWR(`${endPoint}/${ID}`, fetcher)

  if (!data) return { data, status: 'loading' }
  return { data, status: error ? 'error' : 'success' }
}
