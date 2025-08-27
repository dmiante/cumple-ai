'use client'

import {Calendar, PartyPopper, Sparkles} from 'lucide-react'

import {CopyButton} from './CopyButton'

interface BirthdayGreetingProps {
  greeting: string
  name: string
  birthday: string
  isStreaming: boolean
}

function BirthdayGreeting({greeting, name, birthday, isStreaming}: BirthdayGreetingProps) {
  const formatDate = (birthday: string) => {
    if (!birthday) return null

    const date = new Date(birthday)

    return date.toLocaleDateString('es-CL', {timeZone: 'UTC', dateStyle: 'long'})
  }

  return !isStreaming ? (
    <>
      <article className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-6 text-white shadow-lg md:col-span-4 lg:col-span-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <PartyPopper className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">
              Feliz Cumpleaños,
              <span className="font-bold"> {name}!</span>
            </h2>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="max-w-none text-white">
              <p className="leading-relaxed">{greeting}</p>
            </div>
          </div>
          <CopyButton text={greeting} />
        </div>
      </article>
      <article className="flex rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white shadow-lg md:col-span-4 lg:col-span-2">
        <div className="flex gap-4 lg:flex-col lg:gap-4">
          {/* <div className="flex lg:flex-col lg:justify-between"> */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold lg:text-5xl">{formatDate(birthday)}</h2>
            <div className="flex items-center gap-2 text-sm text-purple-100 lg:mt-4">
              <Sparkles className="h-4 w-4" />
              <span>Tú Día Especial!</span>
            </div>
          </div>
        </div>
      </article>
    </>
  ) : (
    // LOADING SKELETON COMPONENT
    <>
      <article className="animate-pulse overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-6 text-white shadow-lg md:col-span-4 lg:col-span-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-200" />
            <div>
              <div className="h-6 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="ml-auto">
              <div className="h-12 w-12 rounded-lg bg-gray-200" />
            </div>
          </div>
          <div className="rounded-2xl p-4">
            <div className="max-w-none text-white">
              <div className="mb-2 h-4 w-full rounded bg-gray-200" />
              <div className="mb-2 h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </article>
      <article className="animate-pulse rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white shadow-lg md:col-span-4 lg:col-span-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-200 backdrop-blur-sm" />
          <div className="flex flex-col">
            <div className="mb-2 h-5 w-60 rounded bg-gray-200" />
            <div className="flex items-center gap-1 text-sm text-purple-100">
              <div className="h-2 w-32 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BirthdayGreeting
