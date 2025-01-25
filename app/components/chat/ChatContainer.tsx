import { useState } from 'react'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import ChatHeader from './ChatHeader'

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSendMessage = async (message: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message })
      })
      
      const data = await response.json()
      
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), content: message, isBot: false, timestamp: new Date() },
        { id: (Date.now() + 1).toString(), content: data.reponse, isBot: true, timestamp: new Date() }
      ])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] bg-white shadow-lg rounded-lg">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
} 