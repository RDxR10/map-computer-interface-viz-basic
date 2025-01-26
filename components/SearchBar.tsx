import type React from "react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="absolute top-4 left-4 z-20">
      <input
        type="text"
        placeholder="Search bases..."
        value={searchTerm}
        onChange={handleChange}
        className="px-4 py-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-sky-500"
        aria-label="Search military bases"
      />
    </div>
  )
}

export default SearchBar

