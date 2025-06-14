'use client'

import { useState } from "react"
import { useCompletion } from "ai/react"

import BirthdayGreeting from "./birthday-greeting"

export default function BirthdayForm() {
  const [dateBirthday, setDateBirthday] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [city, setCity] = useState<string>('')

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
          name: name,
          birthday: dateBirthday,
          city: city
        }
      })
    } catch (error) {
      console.error('Error in complete: ', error)
    }
  }
  return (
    <div>
      <form className="space-y-6 w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <input
            type="text"
            id="name"
            placeholder="Tu nombre"
            className="text-black w-full text-lg p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="date"
            id="birthday"
            data-date-format="YYYY-MM-DD"
            className="text-black w-full text-lg p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
            onChange={(e) => setDateBirthday(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="text"
            id="city"
            placeholder="Tu ciudad"
            className="text-black w-full text-lg p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full text-xl py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 transform hover:scale-105 text-white font-bold"
          disabled={isLoading}
        >
          {
            isLoading ? (
              'Searching...'
            ) : (
              'Get Your Birthday Quote!'
            )
          }
        </button>
      </form>
      {/* Response */}
      {/* {
          completion && completion.length > 0 && ( */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 rounded-2xl shadow-lg max-w-2xl w-full mx-auto text-black text-pretty">
        <BirthdayGreeting content={completion} name={name} birthday={dateBirthday} />
      </div>
      {/* )
        } */}
    </div>
  );
}