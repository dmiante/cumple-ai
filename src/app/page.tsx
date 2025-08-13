'use client'

import {Toaster} from 'sonner'

import BirthdayForm from './components/birthday-form'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="mb-8 text-7xl font-extrabold text-gray-900">
            Cumple<span className="text-pink-700">AI</span>
          </h1>
          <p className="text-pretty text-base text-gray-600">
            Comparte un mensaje de cumpleaños, descubre que hecho historico que ocurrió ese día, y
            revisa que tiendas tienen regalos o eventos gratis para tí.
          </p>
        </header>
        <main className="space-y-6">
          {/* Birthday Form */}
          <BirthdayForm />
        </main>
        <Toaster richColors />
        <footer className="mt-12 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <p>Built by Dmiante 🦁</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
