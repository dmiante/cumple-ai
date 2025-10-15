export const BIRTHDAY_PROMPTS = {
  GREETINGS: (name: string) => `
    Crea una felicitación de cumpleaños breve y cercana para ${name}.
    Debe sonar como un mensaje cálido para un familiar o un amigo.
    No incluyas explicaciones ni texto adicional, solo la felicitación.
    `,
  HISTORICAL: ({monthText, day}: {monthText: string; day: string}) =>
    `Busca un evento histórico significativo que ocurrió exactamente el día ${day} de ${monthText} (${day}/${monthText}) en cualquier año de la historia.

    CRITERIOS DE BÚSQUEDA (en orden de prioridad):
    1. Prioriza eventos históricos de gran impacto (guerras, descubrimientos, tratados, desastres)
    2. Si no hay eventos mayores, busca nacimientos o fallecimientos de personajes muy reconocidos
    3. Elige eventos con buena documentación disponible en Wikipedia en español

    REQUISITOS DEL EVENTO:
    - Debe haber ocurrido específicamente el día ${day} del mes ${monthText}
    - Debe tener un artículo verificable en Wikipedia (preferiblemente es.wikipedia.org)
    - Describe el evento de forma concisa pero informativa (1-2 oraciones, máximo 150 caracteres)
    - Incluye el año del evento en la descripción

    FORMATO DE RESPUESTA:
    Devuelve ÚNICAMENTE un array JSON válido con un objeto que contenga:
    - "text": Una descripción breve del evento incluyendo el año (ej: "1492: Cristóbal Colón llega a América")
    - "link": URL completa y válida del artículo de Wikipedia en español (https://es.wikipedia.org/wiki/...)

    FORMATO EXACTO (sin texto adicional, sin backticks, sin explicaciones):
    [{"text":"[descripción con año]","link":"[URL de Wikipedia]"}]
    `,
  OFFERS: (country: string) =>
    `Busca en internet más de 3 lugares o tiendas que suelen ofrecer artículos, comidas o experiencias gratis a personas en su cumpleaños en ${country}.
    Simplemente responde con lo que encontraste.
    Para cada oferta, rellena el siguiente objeto y agrégalos a un array:

    {
      "name": "[Aquí va el nombre de la tienda o lugar]",
      "offer": "[Aquí va lo que incluye la oferta]",
      "requirements": "[Aquí van los requisitos y cómo solicitarla]"
    }

    Responde únicamente con el array en formato JSON válido. 
    No envuelvas el resultado en comillas, no lo devuelvas como string, no incluyas texto adicional ni backticks.
    El resultado debe comenzar con '[' y terminar con ']'.
    `
}
