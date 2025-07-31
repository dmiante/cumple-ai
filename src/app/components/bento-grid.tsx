'use client'

import BirthdayGreeting from "./birthday-greeting"
import BirthdayHistorical from "./birthday-historical"
import BirthdayOffers from "./birthday-offers"

interface BentoGridProps {
  content: string
  name: string
  birthday: string
  city: string
}

export default function BentoGrid({ content, name, birthday, city }: BentoGridProps) {

  if (!content) return null
  const phrase = content?.split('## ')

  const greetingSection = phrase[1]?.split('Frase: ')[1] || ''
  const historicalSection = phrase[2]?.split('Evento: ')[1] || ''

  let offerSection = []
  if (phrase[3]) {
    const str = phrase[3].split('Ofertas de cumpleaños')
    if (str[1]) {
      try {
        offerSection = JSON.parse(str[1])
      } catch (e) {
        offerSection = []
        console.error('Error parsing offers:', e)
      }
    }
  }

  return (
    <>
      <BirthdayGreeting greeting={greetingSection} name={name} birthday={birthday} />
      <BirthdayHistorical historical={historicalSection} />
      <BirthdayOffers offers={offerSection} city={city} />
    </>
  )
}
