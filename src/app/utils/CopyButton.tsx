'use client'

import {useState} from 'react'
import {Check, Copy} from 'lucide-react'
import {toast} from 'sonner'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({text, label, className}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (!text) {
      return toast('Nada para copiar')
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Texto Copiado!')
      setTimeout(() => setCopied(false), 4000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      toast.error('Error al copiar el texto')
    }
  }

  return (
    <div className={`group relative ${className || ''}`}>
      <button
        aria-label={label ? `Copy ${label}` : 'Copy to clipboard'}
        className="flex h-14 w-full items-center justify-center gap-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:bg-white/50"
        onClick={copyToClipboard}
      >
        <span className="font-medium capitalize transition-all duration-300">
          {copied ? 'Mensaje copiado!' : 'Copia el mensaje y compartelo!'}
        </span>
        <div className="relative">
          <Copy
            className={`h-6 w-6 transition-all duration-300 ease-out ${
              copied ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Check
            className={`absolute inset-0 h-6 w-6 text-white transition-all duration-300 ease-out ${
              copied ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
            }`}
          />
        </div>
      </button>
    </div>
  )
}
