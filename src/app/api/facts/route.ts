import { google } from '@ai-sdk/google'
// import { ollama } from 'ollama-ai-provider'
// import { deepseek } from '@ai-sdk/deepseek'
// import { parse } from '@formkit/tempo'
import { streamText, tool } from 'ai'
// import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  // const { prompt }: { prompt: string } = await req.json()
  const body = await req.json()
  const { name, dateBirthday, city } = body

  const result = await streamText({
    model: google('gemini-2.5-flash-preview-04-17', {
      useSearchGrounding: true
    }),
    // model: ollama('llama3.2:3b'),
    tools: {
      fact: tool({
        description:
          'Get a historical fact from world history about a specific date',
        parameters: z.object({
          date: z.string().describe('The date to get a historical fact about')
        }),
        execute: async ({ date }) => {
          const parseDate = new Date(date)
          const month = parseDate.getMonth() + 1
          const day = parseDate.getDate() + 1
          // const response = await fetch(
          //   `https://history.muffinlabs.com/date/${parseDate.getMonth()}/${parseDate.getDate()}`
          // )
          // const data = await response.json()
          // const msg: string = data.data.Events[0].text
          // return { message: msg }
          const resp = await fetch(`http://numbersapi.com/${month}/${day}/date`)
          const data = await resp.text()
          return { data }
        }
      })
    },
    prompt: `
        Eres un asistente útil que proporciona información personalizada de cumpleaños.
        La respuesta consta de tres partes: la felicitación de cumpleaños, los eventos históricos y las ofertas de cumpleaños. No omitas ninguna. Y solo responde con esas partes en el mismo orden y sin introducción de respuesta.
        Proporciona la siguiente información en formato Markdown para ${name}, cuyo cumpleaños es el ${dateBirthday}:

        ## Saludo de cumpleaños
        Crea una frase que sea una felicitación de cumpleaños cálida y personalizada para ${name}. Hazla alegre, festiva y cercana. Asegúrate de que sea una frase para enviar a otra persona cercana.

        ## Eventos históricos
        Usa la función de tool para obtener un evento histórico que ocurrió el ${dateBirthday}.
        Simplemente responde con los datos que obtengas de la función de tool.

        ## Ofertas de cumpleaños
        Busca en internet al menos 3 lugares o empresas que suelen ofrecer artículos, comidas o experiencias gratis a personas en su cumpleaños en ${city}.
        Simplemente responde con la lista que encontraste. 
        Para cada una, explica brevemente:

        - Qué incluye la oferta
        - Requisitos para solicitarla (como inscribirse en un programa de recompensas)
        - Cómo solicitarla

        Formatea tu respuesta de forma clara y organizada con Markdown. Usa viñetas para las listas.
      `,
    // system: `
    //   The answer is must be in spanish.
    //   `,
    maxSteps: 3,
    temperature: 0.7
  })

  // console.log('STEPS-TEXT: ', result.steps[0].toolResults[0].result.data)
  // console.log('RESULT: ', result.toTextStreamResponse())

  // for await (const textPart of result.textStream) {
  //   console.log(textPart)
  // }

  console.log('toDataStreamRs: ', result.toDataStreamResponse())
  console.log('TEXT: ', result.text)

  return result.toDataStreamResponse()
}
