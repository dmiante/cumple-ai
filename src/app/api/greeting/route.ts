import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
import {NextRequest, NextResponse} from 'next/server'

import {BIRTHDAY_PROMPTS} from '@/app/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const {name} = await req.json()

    const prompt: string = BIRTHDAY_PROMPTS.GREETINGS(name)

    const {text} = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
      system: `
          Eres un asistente útil que proporciona información personalizada de cumpleaños.
          Responde sin introduccion y solo lo que se pregunto.
          `,
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
