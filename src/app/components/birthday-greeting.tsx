'use client'

import { Calendar, CopyIcon, PartyPopper, Sparkles } from 'lucide-react'

interface BirthdayGreetingProps {
  content: string
  name: string
  birthday: string
}

function BirthdayGreeting({ content, name, birthday }: BirthdayGreetingProps) {

  const extractGreeting = (content: string): string | null => {
    if (!content) return null

    const greeting = content.split('## ').slice(1)
    const phrase = greeting[0].split('Frase: ')

    return phrase[1]
  }

  const formatDate = (birthday: string) => {
    if (!birthday) return null

    const date = new Date(birthday)
    return date.toLocaleDateString('es-CL', { timeZone: 'UTC', dateStyle: 'long' })
  }
  return (
    <>
      <article className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-6 text-white shadow-lg md:col-span-4 lg:col-span-4'>
        <div>
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm'>
              <PartyPopper className='h-6 w-6' />
            </div>
            <div>
              <h2 className='text-xl font-bold'>
                Feliz Cumpleaños,
                <span className='font-bold'>{name}!</span>
              </h2>
            </div>
            <div className='ml-auto'>
              <button className='rounded-lg bg-white px-3 py-3 text-black shadow-md'>
                <CopyIcon className='h-6 w-6' />
              </button>
            </div>
          </div>

          <div className='rounded-2xl bg-white/10 p-4 backdrop-blur-sm'>
            <div className='prose prose-pink max-w-none text-white'>
              <p className='text-sm leading-relaxed'>
                {extractGreeting(content)}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white shadow-lg md:col-span-2 lg:col-span-2'>
        <div className=''>
          <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm'>
            <Calendar className='h-6 w-6' />
          </div>
          <div>
            <h2 className='mb-2 text-xl font-bold'>{formatDate(birthday)}</h2>
            <div className='flex items-center gap-1 text-sm text-purple-100'>
              <Sparkles className='h-4 w-4' />
              <span>Tú Día Especial!</span>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BirthdayGreeting
