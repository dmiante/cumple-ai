import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
import {NextRequest, NextResponse} from 'next/server'

import {BIRTHDAY_PROMPTS} from '@/app/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const {country} = await req.json()

    const prompt: string = BIRTHDAY_PROMPTS.OFFERS(country)

    const {text} = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
      temperature: 0.7,
      tools: {
        google_search: google.tools.googleSearch({})
      }
    })

    return NextResponse.json({text})
  } catch (error) {
    console.error('❌ API Error: ', error)

    return new Response(
      JSON.stringify({
        error: 'Failed to generate birthday offers',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {status: 500, headers: {'Content-Type': 'application/json'}}
    )
  }
}
