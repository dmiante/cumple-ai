import {NextRequest, NextResponse} from 'next/server'

import {fetchCityImages} from '@/app/lib/services'

export async function POST(req: NextRequest) {
  try {
    const {query} = await req.json()
    const image = await fetchCityImages(query)

    return NextResponse.json(image)
  } catch (error) {
    console.error(error)

    return NextResponse.json({error: 'Error fetching image'}, {status: 500})
  }
}
