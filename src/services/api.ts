type Paramters = {
  url: string
  requestMethod: 'GET' | 'POST' | 'PUT' | 'DELETE'
  options?: any;
}

export const api = {
  request: async<T = any>({ url, requestMethod, options }: Paramters): Promise<T> => {
    const serverUrl = `http://localhost:3333/${url}`

    const response = await fetch(serverUrl, {
      method: requestMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    })

    const data = await response.json() as T
    return data
  },
}