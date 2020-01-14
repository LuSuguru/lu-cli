import { useState } from 'react'

interface FetchData<I> {
  payload?: I,
  data?: I
}

export default function <T, I> (apiMethod: (params?: T) => FetchData<I>, needLoading = true): [
  (params?: T) => Promise<I>,
  boolean
] {
  const [loading, setLoading] = useState(false)

  async function getData(params?: T) {
    try {
      needLoading && setLoading(true)
      const data = await apiMethod(params)
      needLoading && setLoading(false)

      return data.payload || data.data || null
    } finally {
      needLoading && setLoading(false)
    }
  }

  return [getData, loading]
}
