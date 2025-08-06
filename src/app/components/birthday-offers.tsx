'use client'

import {Gift, MapPin, Tag} from 'lucide-react'

import {CityImage} from '../models/CityImage'

type Offer = {
  name: string
  offer?: string
  requirements?: string
}

interface BirthdayOffersProps {
  offers?: Offer[]
  city: string
  cityImage: CityImage | undefined
}

export default function BirthdayOffers({offers = [], city, cityImage}: BirthdayOffersProps) {
  return (
    <>
      <article className="group relative block h-96 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:col-span-4 lg:col-span-3">
        <img
          alt={cityImage?.alt}
          className="absolute inset-0 h-full w-full object-cover"
          src={cityImage?.src.landscape}
        />
        <div className="relative p-6">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center rounded-2xl bg-orange-100 px-6">
              <h3 className="text-xl font-semibold text-orange-600">{city}</h3>
            </div>
          </div>
        </div>
      </article>
      <article className="rounded-3xl border border-gray-100 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-sm md:col-span-4 lg:col-span-full">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold capitalize text-white">Ofertas para tú cumpleaños</h3>
              <p className="text-xs text-white">
                Ofertas y productos gratis de tiendas cerca tuyo!
              </p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-green-700">
                <Tag className="h-3 w-3" />
                Gratis
              </div>
            </div>
          </div>
          <ul className="max-h-auto grid gap-4 overflow-y-auto">
            {offers && offers.length > 0 ? (
              offers.map(({name, offer, requirements}) => (
                <li key={name} className="rounded-2xl bg-green-50 p-4">
                  <div className="flex flex-col gap-4 text-gray-600">
                    <div className="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-green-600/10 p-4">
                      <h3 className="font-mono text-2xl font-bold">{name}</h3>
                      <p>{offer}</p>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-mono text-lg font-bold">¿Como lo canjeas?</h3>
                      <p>{requirements}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="rounded-2xl bg-green-50 p-4">
                <p className="text-gray-600">No hay ofertas disponibles.</p>
              </li>
            )}
          </ul>
        </div>
      </article>
    </>
  )
}
