import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
import {NextRequest, NextResponse} from 'next/server'

import {BIRTHDAY_PROMPTS} from '@/app/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const {month, day} = await req.json()

    const apiRespHistorical = await fetch(`http://numbersapi.com/${month}/${day}/date`)
    const messageEvent = await apiRespHistorical.text()

    const prompt: string = BIRTHDAY_PROMPTS.HISTORICAL(messageEvent)

    const {text} = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt,
      temperature: 0.7
    })

    return NextResponse.json({text})
  } catch (error) {
    console.error('❌ API Error: ', error)

    return new Response(
      JSON.stringify({
        error: 'Failed to generate birthday events',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {status: 500, headers: {'Content-Type': 'application/json'}}
    )
  }
}
