import { config } from '@/config'

export const sendRequest = async (
  endpoint: string,
  method = 'GET',
  body?: object,
  headers?: HeadersInit
) => {
  try {
    const url = `${config.protocol}://${config.host}:${config.backendPort}/api/${endpoint}`
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Not a JSON response!')
    }

    return data
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}
