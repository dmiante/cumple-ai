import { google } from '@ai-sdk/google'
import { parse } from '@formkit/tempo'
import { streamText, tool } from 'ai'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const { dateBirthday, name, city } = await req.json()
    console.log(dateBirthday)

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      tools: {
        fact: tool({
          description: 'Get a historical fact from world history about a date',
          parameters: z.object({
            date: z.string().describe('The date to get a historical fact about')
          }),
          execute: async ({ date }) => {
            console.log(date)
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
            return { data }
          }
        })
      },
      prompt: `
        You are a helpful assistant that provides information about historical events and free birthday offers.
        Please provide the following information in markdown format:

        ## Birthday Greeting
        Write a warm, personalized birthday greeting for ${name}. Make it cheerful and celebratory.
        ## Birthday Offers
        List at least 5 places or companies that typically offer free items, meals, or experiences for people on their birthday in or around ${city}. For each, briefly explain:
        1. What the offer includes
        2. Any requirements to claim it (like signing up for a rewards program)
        3. How to claim it

        Format your response in a clear, organized way using markdown. Use bullet points for lists.
        `,
      maxSteps: 3
      // temperature: 0.7
    })

    console.log(result.toDataStreamResponse())
    console.log(result.textStream)

    return result
  } catch (error) {
    console.error('Error processing request: ', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
