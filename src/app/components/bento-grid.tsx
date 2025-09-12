'use client'

import {BirthdayBentoGrid} from '../lib/types'

import BirthdayGreeting from './birthday-greeting'
import BirthdayHistorical from './birthday-historical'
import BirthdayOffers from './birthday-offers'

export default function BentoGrid({
  message,
  historical,
  offers,
  name,
  birthDate,
  country,
  countryImage,
  isLoading
}: BirthdayBentoGrid) {
  return (
    <>
      <BirthdayGreeting birthDate={birthDate} isLoading={isLoading} message={message} name={name} />
      <BirthdayHistorical historical={historical} isLoading={isLoading} />
      <BirthdayOffers
        country={country}
        countryImage={countryImage}
        isLoading={isLoading}
        offers={offers}
      />
    </>
  )
}
