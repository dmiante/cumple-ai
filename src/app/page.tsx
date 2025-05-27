'use client'

import { useChat } from "ai/react"
import { useState } from "react"

export default function Home() {
  const [dateBirthday, setDateBirthday] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  // const [quote, setQuote] = useState('')

  const { messages, handleSubmit: handleChatSubmit, isLoading } = useChat({
    api: '/api/facts',
    body: {
      dateBirthday,
      name,
      city
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateBirthday) return console.error('Please enter birthday')
    if (!name) return console.error('Please enter name')
    if (!city) return console.error('Please enter city')

    handleChatSubmit(e, {
      body: {
        dateBirthday,
        name,
        city
      }
    })
  }

  const hasResponse = messages.length > 1

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          Birthday Quote Generator
        </h1>

        {/* Birthday Form */}
        <form className="space-y-6 w-full max-w-md mx-auto"
          onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <label htmlFor="birthday" className="block text-xl font-semibold text-purple-700">
              When&apos;s your birthday?
            </label>
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
              )}
          </button>
        </form>

        {/* Quote Display */}
        {
          hasResponse && (
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 rounded-2xl shadow-lg max-w-2xl w-full mx-auto text-black text-pretty">
              {messages[0].content}
            </div>
          )
        }
      </div>
    </main>
  );
}
