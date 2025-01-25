'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Coucou Admin
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
} 