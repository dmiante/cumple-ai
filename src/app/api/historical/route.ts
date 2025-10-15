import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
import {NextRequest, NextResponse} from 'next/server'

import {BIRTHDAY_PROMPTS} from '@/app/lib/prompts'
import {months} from '@/app/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const {month, day} = await req.json()

    const monthText: string = months[month - 1] || month.toString()

    const prompt: string = BIRTHDAY_PROMPTS.HISTORICAL({monthText, day})

    const {text} = await generateText({
      model: google('gemini-2.5-flash'),
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
