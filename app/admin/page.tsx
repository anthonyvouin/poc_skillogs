'use client'

import { useRouter } from 'next/navigation'
import QuestionList from '../components/admin/QuestionList'

export default function AdminPage() {
  const router = useRouter()


  return (
    <div className="container mx-auto px-4 py-8">
      <QuestionList />
    </div>
  )
} 