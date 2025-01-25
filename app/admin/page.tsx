'use client'

import { useRouter } from 'next/navigation'
import QuestionList from '../components/admin/QuestionList'

export default function AdminPage() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <QuestionList />
    </div>
  )
} 