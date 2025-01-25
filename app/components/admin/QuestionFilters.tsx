interface QuestionFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function QuestionFilters({
  categories,
  selectedCategory,
  onCategoryChange
}: QuestionFiltersProps) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <span className="text-gray-700 font-medium">Filtrer par catégorie:</span>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category === 'all' ? 'Toutes' : category}
          </button>
        ))}
      </div>
    </div>
  )
} 