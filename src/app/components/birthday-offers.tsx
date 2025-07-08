'use client'

import { Gift, MapPin, Tag } from 'lucide-react'
import React from 'react'

export default function BirthdayOffers() {
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
              <h3 className="font-semibold text-gray-900">Name of your City</h3>
            </div>
          </div>
        </div>
      </article>
      <article className="md:col-span-2 lg:col-span-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Birthday Offers</h3>
              <p className="text-xs text-white">Free treats for you</p>
            </div>
            <div className="ml-auto">
              <div className="bg-white text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Free
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 max-h-64 overflow-y-auto">
            <div className="prose prose-blue max-w-none text-gray-700">
              {/* <div dangerouslySetInnerHTML={{ __html: formatHistoricalContent(historicalSection) }} /> */}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
