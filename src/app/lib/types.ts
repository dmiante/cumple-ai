import {CountryImage} from '../models/CountryImage'

export interface BirthdayMessage {
  message: string
  name: string
  birthDate: string
  isLoading: boolean
}

export interface BirthdayBentoGrid {
  message: string
  historical: string
  offers: Offer[]
  name: string
  birthDate: string
  country: string
  countryImage: CountryImage | null
  isLoading: boolean
}

export interface Offer {
  name: string
  description: string
  requirements: string
}

export interface BirthdayOfferCollection {
  offers: Offer[]
  country: string
  countryImage: CountryImage | null
  isLoading: boolean
}

export interface BirthdayHistoricalEvent {
  historical: string
  isLoading: boolean
}
