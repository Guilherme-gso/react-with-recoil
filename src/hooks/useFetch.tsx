import { useEffect } from 'react'
import { RecoilState, useRecoilState } from 'recoil'

type Response<T> = {
  data: T
}

export function useFetch<T = any>(recoilState: RecoilState<T>): Response<T> {
  const [state, setState] = useRecoilState<T>(recoilState)
 
  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await fetch('http://localhost:3333/products')
      const data = await response.json() as T
      setState(data)
    }

    getData()
  }, [setState])

  return { data: state }
}


