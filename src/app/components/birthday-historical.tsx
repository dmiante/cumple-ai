'use client'

import { Clock, ExternalLink } from "lucide-react"

interface BirthdayHistoricalProps {
  content: string
}

export default function BirthdayHistorical({ content }: BirthdayHistoricalProps) {
  return (
    <div className="md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Historical Events</h3>
            <p className="text-xs text-gray-500">On your birthday</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 max-h-64 overflow-y-auto">
          <div className="prose prose-blue max-w-none text-gray-700">
            {/* <div dangerouslySetInnerHTML={{ __html: formatHistoricalContent(historicalSection) }} /> */}
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center gap-1 text-xs text-blue-600">
            <ExternalLink className="h-3 w-3" />
            <span>Data from Wikimedia</span>
          </div>
        </div>
      </div>
    </div>
  )
}
