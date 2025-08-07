import {google} from '@ai-sdk/google'
import {streamText} from 'ai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {name, birthday, city} = body

    const birthDate = new Date(birthday)
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate() + 1

    const apiRespHistorical = await fetch(`http://numbersapi.com/${month}/${day}/date`)

    if (!apiRespHistorical.ok) throw new Error('Failed to fetch historical events from the API!')
    const messageEvent = await apiRespHistorical.text()

    const result = streamText({
      model: google('gemini-2.5-flash', {useSearchGrounding: true}),
      prompt: `
          Crea una frase que sea una felicitación de cumpleaños cálida y personalizada para ${name}. Hazla alegre, festiva y cercana. Asegúrate de que sea una frase para enviar a otra persona cercana.
          Muestra el evento historico proporcionado.
          Busca ofertas y/o productos gratis en tiendas para mi cumpleaños en la siguiente ciudad: ${city}
          `,
      system: `
          Eres un asistente útil que proporciona información personalizada de cumpleaños.
          La respuesta consta de tres partes: la felicitación o saludo de cumpleaños, los eventos históricos y las ofertas de cumpleaños. No omitas ninguna. Y solo responde con esas partes en el mismo orden y sin introducción de respuesta.
          Es importante que proporciones la siguiente información con formato Markdown:

          ## Saludo de cumpleaños
          - Frase: [Aquí va la felicitación de cumpleaños]

          ## Evento histórico
          NO crees un evento historico. Solo muestra la respuesta de abajo y traducelo al español.

          - Evento: ${messageEvent}

          ## Ofertas de cumpleaños
          Busca en internet mas de 3 lugares o tiendas que suelen ofrecer artículos, comidas o experiencias gratis a personas en su cumpleaños en ${city}.
          Simplemente responde con lo que encontraste.
          Para cada oferta, rellena el siguiente objeto y agrégalos a un array:

          {
            "name": "[Aquí va el nombre de la tienda o lugar]",
            "offer": "[Aquí va lo que incluye la oferta]",
            "requirements": "[Aquí va los requisitos y como solicitarla]"
          }
          
          Para las ofertas de cumpleaños: No incluyas backticks en la respuesta. Solo un array con los objetos dentro.
          Respondé únicamente con el array y los objetos dentro, sin formatearlo como bloque de código, sin comillas triples ni backticks.
          Asegúrate de incluir tiendas y/o lugares populares como por ejemplo: Starbucks, Dunkin, etc.

          IMPORTANTE: Usa un formato Markdown para la respuesta. Asegúrate que cada seccion sea claramente marcada con encabezados con ## y usa guiones (-) para las listas. Sé especifico sobre las ofertas gratis y los requisitos.
          `,
      maxSteps: 5,
      temperature: 0.7
    })

    return result.toDataStreamResponse()
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
