// import { google } from '@ai-sdk/google'
import { ollama } from 'ollama-ai-provider'
// import { deepseek } from '@ai-sdk/deepseek'
import { parse } from '@formkit/tempo'
import { generateText, tool } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const { text } = await generateText({
    model: ollama('llama3.2:3b'),
    tools: {
      message: tool({
        description: 'Get a historical fact from world history about a date',
        parameters: z.object({
          date: z.string().describe('The date to get a historical fact about')
        }),
        execute: async ({ date }) => {
          const parseDate = parse(date, 'YYYY-MM-DD')
          // const response = await fetch(
          //   `https://history.muffinlabs.com/date/${parseDate.getMonth()}/${parseDate.getDate()}`
          // )
          // const data = await response.json()
          // const msg: string = data.data.Events[0].text
          // return { message: msg }
          const resp = await fetch(
            `http://numbersapi.com/${parseDate.getMonth()}/${parseDate.getDate()}/date`
          )
          const data = await resp.text()
          return { message: data }
        }
      })
    },
    prompt,
    system:
      'You are a helpful assitant that can provide historical facts about any date in spanish.' +
      'You can provide a birthday message in spanish for a person based on their name and birthday date' +
      `The response is must be in format JSON valid like this: 
      { 
        "fact": "The historical fact here",
        "message": "The message birthday here"
      }
      `,
    maxSteps: 3
  })

  console.log(text)

  return NextResponse.json(text)
}
