'use client'

import {CityImage} from '../models/CityImage'

import BirthdayGreeting from './birthday-greeting'
import BirthdayHistorical from './birthday-historical'
import BirthdayOffers from './birthday-offers'

interface BentoGridProps {
  content: string
  name: string
  birthday: string
  city: string
  cityImage: CityImage | undefined
}

export default function BentoGrid({content, name, birthday, city, cityImage}: BentoGridProps) {
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
      <BirthdayGreeting birthday={birthday} greeting={greetingSection} name={name} />
      <BirthdayHistorical historical={historicalSection} />
      <BirthdayOffers city={city} cityImage={cityImage} offers={offerSection} />
    </>
  )
}
