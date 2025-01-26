import type React from "react"
import { useState } from "react"

interface FilterControlProps {
  onFilterChange: (filters: string[]) => void
}

const FilterControl: React.FC<FilterControlProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const baseTypes = ["Army", "Air Force", "Marine Corps", "Other"]

  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter]
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="absolute top-16 left-4 z-20 bg-slate-800 rounded-md p-2">
      <h3 className="text-white font-bold mb-2">Filter by Type</h3>
      {baseTypes.map((type) => (
        <button
          key={type}
          onClick={() => toggleFilter(type)}
          className={`mr-2 mb-2 px-2 py-1 rounded ${
            activeFilters.includes(type) ? "bg-sky-500 text-white" : "bg-slate-700 text-slate-300"
          }`}
          aria-label={`Filter by ${type}`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

export default FilterControl

