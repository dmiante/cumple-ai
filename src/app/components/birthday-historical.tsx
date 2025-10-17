'use client'

import {Clock, ExternalLink} from 'lucide-react'

import {BirthdayHistoricalEvent} from '../lib/types'

export default function BirthdayHistorical({historical, isLoading}: BirthdayHistoricalEvent) {
  return !isLoading ? (
    <article className="group relative transform overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-lg duration-500 hover:-translate-y-2 hover:shadow-2xl md:col-span-4 lg:col-span-3">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold capitalize text-gray-900">Evento Histórico</h3>
            <p className="text-xs normal-case text-gray-500">En el día de tú cumpleaños</p>
          </div>
        </div>

        {historical && historical.length > 0 ? (
          historical.map(({text, link}) => (
            <div key={link} className="flex h-full flex-col justify-between gap-4">
              <div className="max-h-44 overflow-y-auto rounded-2xl bg-gray-50 p-4 transition-all duration-300 group-hover:bg-indigo-50">
                <p className="text-wrap font-serif text-lg leading-relaxed">{text}</p>
              </div>
              <a
                className="flex items-center justify-between gap-3 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
                href={link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Leer más
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          ))
        ) : (
          <div className="flex rounded-2xl bg-blue-50 p-4">
            <p className="text-gray-600">No se encontraron eventos relacionados con la fecha.</p>
          </div>
        )}
      </div>
    </article>
  ) : (
    // LOADING SKELETON COMPONENT
    <article className="relative animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-4 lg:col-span-3">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <div className="h-6 w-6 rounded bg-gray-200" />
          </div>
          <div>
            <div className="h-4 w-full rounded bg-gray-700" />
            <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
          </div>
        </div>

        <div className="max-h-44 overflow-y-auto rounded-2xl bg-blue-50 p-4">
          <div className="mt-1 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </article>
  )
}
