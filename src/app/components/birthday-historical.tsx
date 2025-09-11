'use client'

import {Clock} from 'lucide-react'

import {BirthdayHistoricalEvent} from '../lib/types'

export default function BirthdayHistorical({historical, isLoading}: BirthdayHistoricalEvent) {
  return !isLoading ? (
    <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-4 lg:col-span-3">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold capitalize text-gray-900">Evento Histórico</h3>
            <p className="text-xs normal-case text-gray-500">En el día de tú cumpleaños</p>
          </div>
        </div>

        <div className="max-h-44 overflow-y-auto rounded-2xl bg-blue-50 p-4">
          {historical ? (
            <p className="max-w-none text-gray-700">{historical}</p>
          ) : (
            <p className="text-gray-700">No se encontraron eventos</p>
          )}
        </div>
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
