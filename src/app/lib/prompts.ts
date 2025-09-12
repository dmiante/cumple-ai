export const BIRTHDAY_PROMPTS = {
  GREETINGS: (name: string) => `
    Crea una felicitación de cumpleaños breve y cercana para ${name}.
    Debe sonar como un mensaje cálido para un familiar o un amigo.
    No incluyas explicaciones ni texto adicional, solo la felicitación.
    `,
  HISTORICAL: (historicalText: string) => `Traduce la siguiente frase al español.
    Responde únicamente con la traducción, sin texto adicional ni explicaciones: [${historicalText}]`,
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
