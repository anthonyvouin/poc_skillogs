import { Question } from '@/app/types/question'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface QuestionItemProps {
  question: Question;
  onDelete: () => void;
  onEdit: () => void;
}

export default function QuestionItem({
  question,
  onDelete,
  onEdit
}: QuestionItemProps) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {question.categorie}
            </span>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900">
            {question.question}
          </h3>
          
          <p className="text-gray-600">
            {question.reponse}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {question.mots_cles.map((mot, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded text-xs"
              >
                {mot}
              </span>
            ))}
          </div>
          
          <div className="text-sm text-gray-500">
            Créée le {format(new Date(question.createdAt), 'dd MMMM yyyy', { locale: fr })}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Modifier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
              <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
            </svg>
          </button>
          
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 