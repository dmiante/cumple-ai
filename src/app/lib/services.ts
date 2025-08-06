import {CityImage} from '../models/CityImage'

export const fetchHistoricalEvent = async (day: number, month: number) => {
  try {
    const resp = await fetch(`http://numbersapi.com/${month}/${day}/date`)

    if (!resp.ok) {
      console.error(`API responded with status: ${resp.status}`)
    }
    const data = await resp.text()

    return {message: data}
  } catch (error) {
    console.error('Error fetching from API:', error)

    return null
  }
}

export const fetchCityImages = async (query: string): Promise<CityImage | undefined> => {
  const apiKey = process.env.API_PEXEL ?? ''

  try {
    const resp = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&size=small`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    )

    if (!resp.ok) throw new Error('Fetch image error!')
    const data = await resp.json()
    const photos = data.photos[0]

    return photos
  } catch (error) {
    console.error(error)
  }
}
