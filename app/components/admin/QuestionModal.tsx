import { useState } from 'react'
import { Question } from '@/app/types/question'

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => void;
  question?: Question;
}

export default function QuestionModal({
  isOpen,
  onClose,
  onSubmit,
  question
}: QuestionModalProps) {
  const [formData, setFormData] = useState({
    question: question?.question || '',
    reponse: question?.reponse || '',
    categorie: question?.categorie || '',
    mots_cles: question?.mots_cles?.join(', ') || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      question: formData.question,
      reponse: formData.reponse,
      categorie: formData.categorie,
      mots_cles: formData.mots_cles.split(',').map(mot => mot.trim()).filter(Boolean)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {question ? 'Modifier la question' : 'Nouvelle question'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.categorie}
                onChange={(e) => setFormData(prev => ({ ...prev, categorie: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Réponse
              </label>
              <textarea
                value={formData.reponse}
                onChange={(e) => setFormData(prev => ({ ...prev, reponse: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={formData.mots_cles}
                onChange={(e) => setFormData(prev => ({ ...prev, mots_cles: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="mot1, mot2, mot3"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                {question ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 