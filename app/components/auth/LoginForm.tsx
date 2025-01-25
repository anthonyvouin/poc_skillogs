'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        document.cookie = `auth_token=${data.token}; path=/; max-age=${data.expiresIn}; secure; samesite=strict`
        
        if (onSuccess) {
          onSuccess()
        }
        
        setTimeout(() => {
          router.push('/admin')
          router.refresh()
        }, 100)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Connexion Admin
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-900 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg disabled:opacity-50 hover:bg-gray-800"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
} 