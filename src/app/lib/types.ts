import {CountryImage} from '../models/CountryImage'

export interface BirthdayMessage {
  message: string
  name: string
  birthDate: string
  isLoading: boolean
}

export interface Offer {
  name: string
  description: string
  requirements: string
}

export interface HistoricalEvent {
  text: string
  link: string
}

export interface BirthdayBentoGrid {
  message: string
  historical: HistoricalEvent[]
  offers: Offer[]
  name: string
  birthDate: string
  country: string
  countryImage: CountryImage | null
  isLoading: boolean
}

export interface BirthdayOfferCollection {
  offers: Offer[]
  country: string
  countryImage: CountryImage | null
  isLoading: boolean
}

export interface BirthdayHistoricalEvent {
  historical: HistoricalEvent[]
  isLoading: boolean
}
