import { google } from '@ai-sdk/google'
// import { ollama } from 'ollama-ai-provider'
// import { deepseek } from '@ai-sdk/deepseek'
import { streamText, tool } from 'ai'
import { z } from 'zod'

export async function POST(req: Request) {
  // const { prompt }: { prompt: string } = await req.json()
  const body = await req.json()
  const { name, birthday, city } = body

  const result = streamText({
    model: google('gemini-2.5-flash-preview-04-17', {
      useSearchGrounding: true
    }),
    // model: ollama('llama3.2:3b'),
    tools: {
      fact: tool({
        description:
          'Get a historical fact from world history about a specific date.',
        parameters: z.object({
          date: z.string().describe('The date to get a historical fact about')
        }),
        execute: async ({ date }) => {
          console.log(date)
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
        Crea una frase que sea una felicitación de cumpleaños cálida y personalizada para ${name}. Hazla alegre, festiva y cercana. Asegúrate de que sea una frase para enviar a otra persona cercana.
        Busca un evento histórico para el dia: ${birthday}.
        Busca ofertas y/o productos gratis en tiendas para mi cumpleaños en la siguiente ciudad: ${city}
        `,
    system: `
        Eres un asistente útil que proporciona información personalizada de cumpleaños.
        La respuesta consta de tres partes: la felicitación o saludo de cumpleaños, los eventos históricos y las ofertas de cumpleaños. No omitas ninguna. Y solo responde con esas partes en el mismo orden y sin introducción de respuesta.
        Proporciona la siguiente información con este formato:

        ## Saludo de cumpleaños
        - Frase: [Aquí va la felicitación de cumpleaños]

        ## Eventos históricos
        Usa la función de tool para obtener el evento histórico.
        Simplemente responde con los datos que obtengas de la función de tool.
        - Hecho: [Aquí va el hecho histórico]

        ## Ofertas de cumpleaños
        Busca en internet al menos 3 lugares o tiendas que suelen ofrecer artículos, comidas o experiencias gratis a personas en su cumpleaños en ${city}.
        Simplemente responde con lo que encontraste.
        Para cada oferta, rellena el siguiente objeto y agrégalos a un array:

        {
          "name": "[Aquí va el nombre de la tienda o lugar]",
          "offer": "[Aquí va lo que incluye la oferta]",
          "requirements": "[Aquí va los requisitos y como solicitarla]"
        }
        
        No incluyas backticks en la respuesta. Solo el JSON crudo.
        Respondé únicamente con un JSON válido, sin formatearlo como bloque de código, sin comillas triples ni backticks. Solo el objeto JSON.

        Asegúrate de incluir tiendas y/o lugares populares como por ejemplo: Starbucks, Dunkin, etc.

        Importante: Asegúrate que cada section sea claramente marcada con encabezados con ## y las usa guiones (-) para las listas. Sé especifico sobre las ofertas gratis y los requisitos.
        `,
    maxSteps: 3,
    temperature: 0.7,
    toolChoice: { type: 'tool', toolName: 'fact' }
  })

  return result.toDataStreamResponse()
}
