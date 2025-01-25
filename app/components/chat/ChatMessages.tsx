'use client'

import { motion } from 'framer-motion'

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(600px-130px)]">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isBot
                ? 'bg-gray-100 text-gray-900'
                : 'bg-gray-900 text-white'
            }`}
          >
            {message.content}
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-lg">
            <span className="animate-pulse">...</span>
          </div>
        </div>
      )}
    </div>
  )
} 