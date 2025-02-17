import { google } from '@ai-sdk/google'
import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'
// import { z } from 'zod'

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const { text, experimental_providerMetadata } = await generateText({
    model: google('gemini-2.0-flash-exp', {
      useSearchGrounding: true
    }),
    // tools: {
    //   message: tool({
    //     description: 'Get the message',
    //     parameters: z.object({
    //       location: z.string().describe('The location to get the weather for')
    //     }),
    //     execute: async ({ location }) => ({
    //       location,
    //       temperature: 72 + Math.floor(Math.random() * 21) - 10
    //     })
    //   })
    // },
    prompt
  })

  const metadata = experimental_providerMetadata?.google as
    | GoogleGenerativeAIProviderMetadata
    | undefined
  const groundingMetadata = metadata?.groundingMetadata
  const support = groundingMetadata?.groundingSupports
  // console.log(groundingMetadata)
  // console.log({ PROMPT: prompt })
  console.log({ text, support })

  return NextResponse.json(text)
}
