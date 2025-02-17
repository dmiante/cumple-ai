'use client'

import { useState } from "react"

export default function Home() {
  const [dateBirthday, setDateBirthday] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [quote, setQuote] = useState('')
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const res = await fetch('/api/facts', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `Eres un asistente experto en crear experiencias personalizadas para cumpleaños.
          Recibirás el siguiente nombre: ${name} y la siguiente fecha de cumpleaños: ${dateBirthday}.
          Tu tarea es generar mensajes originales y emotivos para felicitar a una persona en su cumpleaños, basado en el nombre que recibiste.
          Asegúrate de que el tono del mensaje sea amigable y especial, no mas de 100 palabras y en español.
          Si el nombre recibido no es un nombre válido como por ejemplo preguntas, mensajes sin sentido o en otros idiomas, deberás indicar que se vuelva a escribir un nombre con una extensión máxima de tres palabras y valid sera false.
          Me devolverás la respuesta en texto plano como el siguiente:
          { "message": "Tu respuesta", "valid": true }
          `
        })
      })
      const data = await res.json()
      console.log(data)
      setQuote(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          Birthday Quote Generator
        </h1>

        {/* Birthday Form */}
        <form className="space-y-6 w-full max-w-md mx-auto"
          onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="birthday" className="block text-xl font-semibold text-purple-700">
              Whens your birthday?
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tu nombre"
              className="text-black w-full text-lg p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              id="birthday"
              className="text-black w-full text-lg p-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300"
              onChange={(e) => setDateBirthday(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-xl py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 transform hover:scale-105 text-white font-bold"
          >
            Get Your Birthday Quote!
          </button>
        </form>

        {/* Quote Display */}
        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 rounded-2xl shadow-lg max-w-2xl w-full mx-auto text-black text-pretty">
          <p>{quote}</p>
        </div>
      </div>
    </main>
  );
}
