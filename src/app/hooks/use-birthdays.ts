import {useRef, useState} from 'react'
import {toast} from 'sonner'

import {CountryImage} from '../models/CountryImage'
import {countries} from '../lib/constants'
import {HistoricalEvent, Offer} from '../lib/types'

export function useBirthday() {
  const [nameInput, setNameInput] = useState<string>('')
  const [birthdayInput, setBirthdayInput] = useState<string>('')
  const [countryName, setCountryName] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [countryImage, setCountryImage] = useState<CountryImage | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [onError, setOnError] = useState<Error | null>(null)
  const [greetingText, setGreetingText] = useState<string>('')
  const [historicalText, setHistoricalText] = useState<HistoricalEvent[]>([{text: '', link: ''}])
  const [offersText, setOffersText] = useState<Offer[]>([
    {name: '', description: '', requirements: '', link: ''}
  ])
  const submittedRef = useRef({name: '', birthday: '', country: ''})

  const generateGreeting = async (name: string) => {
    setIsLoading(true)
    try {
      const resp = await fetch('/api/greeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      })

      const data = await resp.json()

      setGreetingText(data.text)
    } catch (error) {
      toast.error('Error generating birthday message')
      setOnError(
        error instanceof Error
          ? error
          : new Error('Failed to fetch greeting birthday from the API!')
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getHistoricalEvent = async (birthday: string) => {
    const birthDate = new Date(birthday)
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate() + 1

    setIsLoading(true)
    try {
      const resp = await fetch('/api/historical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({month, day})
      })

      const {text} = await resp.json()

      const firstBracket = text.indexOf('[')
      const lastBracket = text.lastIndexOf(']')

      if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) return null

      const candidate = text.slice(firstBracket, lastBracket + 1)
      const parsed = JSON.parse(candidate)

      setHistoricalText(parsed)
    } catch (error) {
      toast.error('Error generating historical event')
      setOnError(
        error instanceof Error
          ? error
          : new Error('Failed to fetch historical events from the API!')
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getBirthdayOffers = async (country: string) => {
    setIsLoading(true)
    try {
      const resp = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({country})
      })

      const {text} = await resp.json()

      const firstBracket = text.indexOf('[')
      const lastBracket = text.lastIndexOf(']')

      if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) return null

      const candidate = text.slice(firstBracket, lastBracket + 1)
      const parsed = JSON.parse(candidate)

      setOffersText(parsed)
    } catch (error) {
      toast.error('Error generating birthday offers')
      setOnError(
        error instanceof Error ? error : new Error('Failed to fetch birthday offers from the API!')
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getCountryImage = async (query: string) => {
    setIsLoading(true)
    try {
      const resp = await fetch('/api/photo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
      })
      const {photos} = await resp.json()

      setCountryImage(photos)
    } catch (error) {
      toast.error('Error generating country image')
      setOnError(
        error instanceof Error ? error : new Error('Failed to fetch country image from the API!')
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!birthdayInput) return null

    const birthdayLongDate = new Date(birthdayInput).toLocaleDateString('es-CL', {
      timeZone: 'UTC',
      dateStyle: 'long'
    })

    submittedRef.current = {name: nameInput, birthday: birthdayLongDate, country: selectedCountry}

    await generateGreeting(nameInput)
    await getHistoricalEvent(birthdayInput)
    await getCountryImage(countryName)
    await getBirthdayOffers(countryName)
  }

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleInputBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdayInput(e.target.value)
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value
    const countryName = countries.find((country) => country.id === countryId)?.name || ''

    setSelectedCountry(countryId)
    setCountryName(countryName)
  }

  return {
    nameInput,
    birthdayInput,
    selectedCountry,
    countryName,
    countryImage,
    submittedRef,
    birthDate: submittedRef.current.birthday,
    name: submittedRef.current.name,
    greetingText,
    historicalText,
    offersText,
    isLoading,
    onError,
    handleSubmitForm,
    handleInputNameChange,
    handleInputBirthdayChange,
    handleCountryChange
  }
}
