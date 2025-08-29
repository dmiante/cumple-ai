'use client'

import {useState} from 'react'
import {useCompletion} from '@ai-sdk/react'
import {AlertCircle, ArrowRight, Calendar, Loader2, MapPin, User} from 'lucide-react'
import {toast} from 'sonner'

import {CityImage} from '../models/CityImage'
import {countries} from '../lib/constants'

import BentoGrid from './bento-grid'

export default function BirthdayForm() {
  const [birthdayInput, setBirthdayInput] = useState<string>('')
  const [nameInput, setNameInput] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countrySelect, setCountrySelect] = useState('')
  const [cityImage, setCityImage] = useState<CityImage | undefined>()

  const {completion, setCompletion, complete, isLoading, error, stop} = useCompletion({
    api: '/api/facts',
    onFinish: () => {
      toast.success('Completion finished')
    },
    onError: (error: Error) => {
      toast.error('Completion error')
      console.error('Completion error: ', error.message)
    }
  })

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCompletion('')
    try {
      await complete('', {
        body: {
          name: nameInput,
          birthday: birthdayInput,
          city: countrySelect
        }
      })
      const resp = await fetch('/api/photo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: countrySelect})
      })
      const data = await resp.json()

      setCityImage(data)
    } catch (error) {
      console.error('Error in complete: ', error)
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value
    const countryName = countries.find((country) => country.id === countryId)?.name || ''

    setSelectedCountry(countryId)
    setCountrySelect(countryName)
  }

  return (
    <>
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
          <div className="text-sm text-red-800">
            Oops! Un error inesperado ha ocurrido. Intentalo de nuevo.
          </div>
        </div>
      )}
      <section className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <form className="space-y-5" onSubmit={handleSubmitForm}>
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              htmlFor="nameID"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                <User className="h-3 w-3 text-blue-600" />
              </div>
              Nombre
            </label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              disabled={isLoading}
              id="nameID"
              placeholder="Escribe el nombre de la persona a felicitar"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              htmlFor="birthID"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100">
                <Calendar className="h-3 w-3 text-purple-600" />
              </div>
              Fecha de Cumpleaños
            </label>
            <input
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              data-date-format="YYYY-MM-DD"
              disabled={isLoading}
              id="birthID"
              type="date"
              value={birthdayInput}
              onChange={(e) => setBirthdayInput(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              htmlFor="countryID"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <MapPin className="h-3 w-3 text-green-600" />
              </div>
              Pais
            </label>
            <select
              className="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              disabled={isLoading}
              id="countryID"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              {countries.map(({id, name}) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  Generando...
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Buscar
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {isLoading && (
              <button
                className="flex h-12 items-center justify-center rounded-xl bg-red-500 px-4 font-medium text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-red-500/40"
                type="button"
                onClick={() => {
                  stop()
                }}
              >
                Stop
              </button>
            )}
          </div>
        </form>
      </section>
      {/* Response */}
      {(completion || isLoading) && (
        <section className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <BentoGrid
            birthday={birthdayInput}
            city={selectedCountry}
            cityImage={cityImage}
            content={completion}
            isStreaming={isLoading}
            name={nameInput}
          />
        </section>
      )}
    </>
  )
}
