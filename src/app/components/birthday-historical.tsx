'use client'

import { Clock } from "lucide-react"

interface BirthdayHistoricalProps {
  historical: string
}

export default function BirthdayHistorical({ historical }: BirthdayHistoricalProps) {
  return (
    <article className="md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">Evento Histórico</h3>
            <p className="text-xs text-gray-500 normal-case">En el día de tú cumpleaños</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 max-h-44 overflow-y-auto">
          {
            historical ? (
              <p className="max-w-none text-gray-700">
                {historical}
              </p>
            ) : (
              <p className="text-gray-700">No se encontraron eventos</p>
            )
          }
        </div>
      </div>
    </article>
  )
}
