import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_UNSPLASH ?? ''

  try {
    const {query} = await req.json()
    const resp = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${query}`
    )

    if (!resp.ok) throw new Error('Failed to fetch images from the API!')
    const data = await resp.json()
    const photos = data.results[0]

    return NextResponse.json({photos})
  } catch (error) {
    console.error(error)

    return NextResponse.json({error: 'Error API'}, {status: 500})
  }
}
