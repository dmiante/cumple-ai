'use client'

import { Calendar, CopyIcon, PartyPopper, Sparkles } from 'lucide-react'

interface BirthdayGreetingProps {
  content: string
  name: string
  birthday: string
}

function BirthdayGreeting({ content, name, birthday }: BirthdayGreetingProps) {
  return (
    <>
      <article className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-6 text-white shadow-lg md:col-span-4 lg:col-span-4'>
        <div>
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm'>
              <PartyPopper className='h-6 w-6' />
            </div>
            <div>
              <h2 className='text-xl font-bold'>Feliz Cumpleaños,
                <span className='font-bold'>{name}!</span>
              </h2>
            </div>
            <div className="ml-auto">
              <button className="bg-white text-black px-3 py-3 rounded-lg shadow-md">
                <CopyIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className='rounded-2xl bg-white/10 p-4 backdrop-blur-sm'>
            <div className='prose prose-pink max-w-none text-white'>
              <p className='text-sm leading-relaxed'>
                🎉 Weve gathered some special birthday insights just for you!
                Check out the historical events that happened on your birthday
                and discover free birthday offers in your area!
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
            <h2 className='mb-2 text-2xl font-bold'>{birthday}</h2>
            <div className='flex items-center gap-1 text-xs text-purple-100'>
              <Sparkles className='h-3 w-3' />
              <span>Tú Día Especial!</span>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BirthdayGreeting
