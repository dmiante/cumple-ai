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
    `Busca en internet AL MENOS 5 lugares, tiendas, restaurantes o empresas que actualmente ofrecen artículos, comidas o experiencias GRATIS o con descuento significativo a personas en su cumpleaños en ${country}.

    CRITERIOS DE BÚSQUEDA:
    1. Prioriza ofertas verificables y activas en ${new Date().getFullYear()}
    2. Incluye variedad: restaurantes, cafeterías, tiendas de retail, entretenimiento, belleza
    3. Enfócate en marcas conocidas o cadenas establecidas con presencia en ${country}
    4. Verifica que las ofertas sean actuales (descarta promociones antiguas o descontinuadas)
    5. Busca en sitios web oficiales, blogs de ofertas locales y páginas de cupones de ${country}

    INFORMACIÓN REQUERIDA PARA CADA OFERTA:
    - "name": Nombre oficial completo del establecimiento o marca
    - "description": Descripción específica y clara de lo que se ofrece (ej: "Postre gratis", "20% descuento en compra", "Entrada gratuita")
    - "requirements": Requisitos COMPLETOS y ESPECÍFICOS:
      * ¿Necesita registrarse previamente? ¿Dónde y cuándo?
      * ¿Debe presentar identificación?
      * ¿Es válido el día exacto o durante el mes del cumpleaños?
      * ¿Necesita descargar una app o unirse a un programa de lealtad?
      * ¿Hay compra mínima requerida?
      * ¿Aplica solo para ciertos productos o servicios?
    - "link": URL completa y válida donde se puede:
      * Registrarse para reclamar la oferta, O
      * Ver los detalles oficiales de la promoción, O
      * Sitio web principal de la empresa (si no hay página específica de la oferta)
      * Prioriza links oficiales del establecimiento sobre blogs o sitios de terceros

    FORMATO DE RESPUESTA:
    Devuelve ÚNICAMENTE un array JSON válido con mínimo 5 objetos.
    Sin texto adicional, sin backticks, sin explicaciones, sin comillas envolventes.

    FORMATO EXACTO:
    [{"name":"[Nombre completo]","description":"[Descripción específica]","requirements":"[Requisitos detallados paso a paso]","link":"[URL completa]"}]

    EJEMPLO DE CALIDAD ESPERADA:
    [{"name":"Starbucks","description":"Bebida gratis de cualquier tamaño","requirements":"Debes registrarte en Starbucks Rewards al menos 3 días antes de tu cumpleaños. La oferta es válida durante todo el mes de tu cumpleaños y se activa automáticamente en tu cuenta.","link":"https://rewards.starbucks.cl/loyalty"}]
    `
}
