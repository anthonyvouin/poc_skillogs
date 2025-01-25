'use client'

import { useState, FormEvent } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      await onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
      <div className="flex gap-2 pb-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg disabled:opacity-50 hover:bg-gray-800"
        >
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </form>
  )
} 