'use client'

import BirthdayForm from "./components/birthday-form";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-7xl font-extrabold text-gray-900 mb-8">
              Cumple<span className="text-pink-700">AI</span>
            </h1>
            <p className="text-gray-600 text-base text-pretty">Comparte un mensaje de cumpleaños, descubre que hecho historico que ocurrió ese día, y revisa que tiendas tienen regalos o eventos gratis para tí.</p>
          </header>
          <main className="space-y-6">
            {/* Birthday Form */}
            <BirthdayForm />
          </main>
          <footer className="mt-12 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <p>Built by Dmiante 🦁</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
