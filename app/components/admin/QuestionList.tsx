import { useEffect, useState } from 'react'
import { Question, QuestionResponse } from '@/app/types/question'
import QuestionItem from './QuestionItem'
import QuestionFilters from './QuestionFilters'
import QuestionModal from './QuestionModal'

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/admin/questions')
      const data: QuestionResponse = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Erreur lors du chargement des questions')
      }

      setQuestions(data.data)
      setFilteredQuestions(
        selectedCategory === 'all' 
          ? data.data 
          : data.data.filter(q => q.categorie === selectedCategory)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleCreate = async (data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Erreur lors de la création')
      }

      setIsModalOpen(false)
      fetchQuestions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la création')
    }
  }

  const handleUpdate = async (data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingQuestion) return

    try {
      const response = await fetch(`/api/admin/questions/${editingQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Erreur lors de la mise à jour')
      }

      setIsModalOpen(false)
      setEditingQuestion(null)
      fetchQuestions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
    }
  }

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingQuestion(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la suppression')
      }

      fetchQuestions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

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
          onClick={() => setIsModalOpen(true)}
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
                onDelete={() => handleDelete(question.id)}
                onEdit={() => handleEdit(question)}
              />
            ))}
          </div>
        )}
      </div>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingQuestion ? handleUpdate : handleCreate}
        question={editingQuestion || undefined}
      />
    </div>
  )
} 