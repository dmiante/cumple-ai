'use client'

import React, {useMemo} from 'react'

import {CountryImage} from '../models/CountryImage'

import BirthdayGreeting from './birthday-greeting'
import BirthdayHistorical from './birthday-historical'
import BirthdayOffers from './birthday-offers'

interface BentoGridProps {
  content: string
  name: string
  birthday: string
  country: string
  countryImage: CountryImage | undefined
  isStreaming: boolean
}

interface OffersList {
  name: string
  offer: string
  requirements: string
}

export default function BentoGrid({
  content,
  name,
  birthday,
  country,
  countryImage,
  isStreaming
}: BentoGridProps) {
  const phrase = content?.split('## ')

  const greetingSection = phrase[1]?.split('Frase: ')[1] || ''
  const historicalSection = phrase[2]?.split('Evento: ')[1] || ''

  const rawOffers = phrase[3]?.split('Ofertas de cumpleaños')[1] || ''

  const parsedOffers = useMemo<OffersList[] | null>(() => {
    if (!rawOffers) return null
    const firstBracket = rawOffers.indexOf('[')
    const lastBracket = rawOffers.lastIndexOf(']')

    if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) return null

    const candidate = rawOffers.slice(firstBracket, lastBracket + 1)

    try {
      const parsed = JSON.parse(candidate)

      return Array.isArray(parsed) ? parsed : null
    } catch (e) {
      console.error(e)

      return null
    }
  }, [rawOffers])

  if (!content) return null

  return (
    <>
      <BirthdayGreeting
        birthday={birthday}
        greeting={greetingSection}
        isStreaming={isStreaming}
        name={name}
      />
      <BirthdayHistorical historical={historicalSection} isStreaming={isStreaming} />
      <BirthdayOffers
        country={country}
        countryImage={countryImage}
        isStreaming={isStreaming}
        offers={parsedOffers}
      />
    </>
  )
}
