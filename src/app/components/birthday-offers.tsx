'use client'

import { Gift, MapPin, Tag } from 'lucide-react'

type Offer = {
  name: string
  offer?: string
  requirements?: string
}

interface BirthdayOffersProps {
  offers?: Offer[]
  city: string
}

export default function BirthdayOffers({ offers = [], city }: BirthdayOffersProps) {
  return (
    <>
      <article className="md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div>
          {/* TODO: background of your city from some API images */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{city}</h3>
            </div>
          </div>
        </div>
      </article>
      <article className="md:col-span-4 lg:col-span-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white capitalize">Ofertas para tú cumpleaños</h3>
              <p className="text-xs text-white">Ofertas y productos gratis de tiendas cerca tuyo!</p>
            </div>
            <div className="ml-auto">
              <div className="bg-white text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Gratis
              </div>
            </div>
          </div>
          <ul className="grid gap-4 max-h-auto overflow-y-auto">
            {
              offers && offers.length > 0 ? (
                offers.map(({ name, offer, requirements }) => (
                  <li key={name} className='bg-green-50 rounded-2xl p-4'>
                    <div className='flex text-gray-600 flex-col gap-4'>
                      <div className='flex flex-col justify-center items-center p-4 w-full gap-2 border-b-2 border-b-green-600/10'>
                        <h3 className='font-bold font-mono text-2xl'>{name}</h3>
                        <p>{offer}</p>
                      </div>
                      <div className='flex-1 p-4'>
                        <h3 className='font-bold font-mono text-lg'>¿Como lo canjeas?</h3>
                        <p>{requirements}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className='bg-green-50 rounded-2xl p-4'>
                  <p className='text-gray-600'>No hay ofertas disponibles.</p>
                </li>
              )
            }
          </ul>
        </div>
      </article>
    </>
  )
}
