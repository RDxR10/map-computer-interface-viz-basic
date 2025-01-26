import type React from "react"
import type { MilitaryBase } from "../types/militaryBase"

interface BaseDetailsPanelProps {
  base: MilitaryBase
  onClose: () => void
}

const BaseDetailsPanel: React.FC<BaseDetailsPanelProps> = ({ base, onClose }) => {
  const getLocationContext = (x: number, y: number) => {
    if ((x >= 25 && x <= 35 && y >= 65 && y <= 75) || (x >= 70 && x <= 80 && y >= 20 && y <= 30)) {
      return "Located in a safe zone."
    }
    if (
      (x >= 15 && x <= 25 && y >= 15 && y <= 25) ||
      (x >= 55 && x <= 65 && y >= 55 && y <= 65) ||
      (x >= 80 && x <= 90 && y >= 75 && y <= 85)
    ) {
      return "Located in a high-risk area."
    }
    return "Located in a neutral area."
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-cyan-700 bg-[#0F172A] text-slate-100 p-4 rounded-lg shadow-xl max-w-md w-full">
      <h3 className="text-lg font-bold mb-2 text-cyan-400">
        {base.name}, {base.state}
      </h3>
      <p className="text-sm text-cyan-300 mb-1">Type: {base.type}</p>
      <p className="text-sm text-cyan-300 mb-2">Personnel: {base.personnel.toLocaleString()}</p>
      <p className="text-sm mb-2 text-yellow-300">{getLocationContext(base.coordinates.x, base.coordinates.y)}</p>
      <p className="text-sm mb-3 text-slate-300">{base.description}</p>
      <button
        onClick={onClose}
        className="bg-cyan-900 text-cyan-100 px-3 py-1 rounded text-xs hover:bg-cyan-800 transition-colors"
        aria-label="Close details"
      >
        Close
      </button>
    </div>
  )
}

export default BaseDetailsPanel

