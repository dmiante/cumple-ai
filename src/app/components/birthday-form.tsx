'use client'

import { useState } from "react"
import { useCompletion } from "ai/react"

import { ArrowRight, Calendar, Loader2, MapPin, User } from "lucide-react"

import BentoGrid from "./bento-grid"


export default function BirthdayForm() {
  const [birthdayInput, setBirthdayInput] = useState<string>('')
  const [nameInput, setNameInput] = useState<string>('')
  const [cityInput, setCityInput] = useState<string>('')

  const {
    completion,
    setCompletion,
    complete,
    isLoading
  } = useCompletion({
    api: '/api/facts'
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCompletion('')
    try {
      await complete('', {
        body: {
          name: nameInput,
          birthday: birthdayInput,
          city: cityInput
        }
      })
    } catch (error) {
      console.error('Error in complete: ', error)
    }
  }
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto">
        <form className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label htmlFor="nameID" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-blue-600" />
              </div>
              Tú nombre
            </label>
            <input
              type="text"
              id="nameID"
              placeholder="Escribe tu nombre"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="birthID" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-3 w-3 text-purple-600" />
              </div>
              Tú Día de Cumpleaños
            </label>
            <input
              type="date"
              id="birthID"
              data-date-format="YYYY-MM-DD"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-gray-900 transition-colors"
              onChange={(e) => setBirthdayInput(e.target.value)}
              value={birthdayInput}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cityID" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-3 w-3 text-green-600" />
              </div>
              Tú Ciudad
            </label>
            <input
              type="text"
              id="cityID"
              placeholder="Escribe tu ciudad"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none text-gray-900 transition-colors"
              onChange={(e) => setCityInput(e.target.value)}
              value={cityInput}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {
              isLoading ? (
                <>
                  Preparando...
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Buscar
                  <ArrowRight className="h-4 w-4" />
                </>
              )
            }
          </button>
        </form>
      </div>
      {/* Response */}
      {
        completion && completion.length > 0 &&
        (
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-min">
            <BentoGrid
              content={completion}
              name={nameInput}
              birthday={birthdayInput}
              city={cityInput}
            />
          </section>
        )
      }
    </>
  );
}