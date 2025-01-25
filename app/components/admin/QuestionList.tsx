import { useEffect, useState } from 'react'
import { Question, QuestionResponse } from '@/app/types/question'
import QuestionItem from './QuestionItem'
import QuestionFilters from './QuestionFilters'


export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/admin/questions')
        const data: QuestionResponse = await response.json()
        
        if (!data.success) {
          throw new Error(data.message || 'Erreur lors du chargement des questions')
        }

        setQuestions(data.data)
        setFilteredQuestions(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredQuestions(questions)
    } else {
      setFilteredQuestions(questions.filter(q => q.categorie === category))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur ! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  const categories = ['all', ...new Set(questions.map(q => q.categorie))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Questions ({filteredQuestions.length})
        </h1>
        <button
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => {}}
        >
          Nouvelle Question
        </button>
      </div>

      <QuestionFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="bg-white shadow rounded-lg">
        {filteredQuestions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucune question trouvée
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredQuestions.map((question) => (
              <QuestionItem 
                key={question.id} 
                question={question}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 