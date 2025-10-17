'use client'

import {Gift, MapPin, Tag} from 'lucide-react'

import {BirthdayOfferCollection} from '../lib/types'

export default function BirthdayOffers({
  offers,
  country,
  countryImage,
  isLoading
}: BirthdayOfferCollection) {
  return !isLoading ? (
    <>
      <article className="group relative block h-96 transform overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg duration-300 hover:-translate-y-2 md:col-span-4 lg:col-span-3">
        <img
          alt={countryImage?.alt_description}
          className="absolute inset-0 h-full w-full object-cover"
          src={countryImage?.urls.regular}
        />
        <div className="relative p-6">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center rounded-2xl bg-orange-100 px-6">
              <h3 className="text-xl font-semibold text-orange-600">{country}</h3>
            </div>
          </div>
        </div>
      </article>
      <article className="transform rounded-3xl border border-gray-100 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-lg duration-300 hover:-translate-y-2 md:col-span-4 lg:col-span-full">
        <div>
          <div className="lg:mb-4 lg:flex lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold capitalize text-white">
                  Ofertas para tu cumpleaños
                </h3>
                <p className="text-pretty text-base text-white">
                  Ofertas y productos gratis de tiendas cerca tuyo!
                </p>
              </div>
            </div>
            <div className="my-4 flex justify-center">
              <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-bold text-emerald-600 shadow-sm hover:bg-amber-100 lg:text-sm">
                <Tag className="h-4 w-4" />
                {offers?.length} Ofertas GRATIS!
              </div>
            </div>
          </div>
          {/* <div>{offers}</div> */}
          <ul className="max-h-auto grid gap-4 overflow-y-auto">
            {offers && offers.length > 0 ? (
              offers.map(({name, description, requirements, link}) => (
                <li key={name}>
                  <a
                    className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/15 p-8 text-white backdrop-blur-sm hover:bg-white/20"
                    href={link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="group grid gap-4 lg:grid-cols-[40%,auto,1fr]">
                      <div className="flex w-full flex-col items-center justify-center gap-2 text-center lg:max-w-72 lg:items-start lg:text-start">
                        <div className="relative mb-2 text-balance font-mono text-4xl font-bold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-amber-200 after:transition-all after:duration-300 hover:after:w-full group-hover:text-amber-200">
                          {name}
                        </div>
                        <p className="text-balance text-lg">{description}</p>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/70 to-transparent lg:h-full lg:w-px lg:flex-none lg:bg-gradient-to-b" />
                      <div className="flex flex-col gap-4 text-center lg:mx-auto lg:p-4 lg:text-start">
                        <h3 className="font-mono text-xl font-bold group-hover:text-amber-200">
                          ¿Como lo canjeas?
                        </h3>
                        <p className="text-pretty font-light leading-relaxed">{requirements}</p>
                      </div>
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <li className="rounded-2xl bg-green-50 p-4">
                <p className="text-gray-600">No se encontraron ofertas en tu area.</p>
              </li>
            )}
          </ul>
        </div>
      </article>
    </>
  ) : (
    // LOADING SKELETON COMPONENT
    <>
      <article className="group relative block h-96 animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:col-span-4 lg:col-span-3">
        <div className="absolute inset-0 h-full w-full bg-gray-200" />
        <div className="relative p-6">
          <div className="flex gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
            </div>
            <div className="flex items-center rounded-2xl bg-gray-200 px-6">
              <div className="h-6 w-24 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </article>
      <article className="animate-pulse rounded-3xl border border-gray-100 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-sm md:col-span-4 lg:col-span-full">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <div className="h-6 w-6 rounded-full bg-white" />
            </div>
            <div>
              <div className="h-4 w-3/4 rounded bg-white" />
              <div className="mt-2 h-4 w-1/2 rounded bg-white" />
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-green-700">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
            </div>
          </div>
          <ul className="max-h-auto grid gap-4 overflow-y-auto">
            <li className="rounded-2xl bg-green-50 p-4">
              <div className="flex flex-col gap-4 text-gray-600">
                <div className="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-green-600/10 p-4">
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                </div>
                <div className="flex-1 p-4">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-full rounded bg-gray-200" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </>
  )
}
