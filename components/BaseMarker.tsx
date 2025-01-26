import type React from "react"
import type { MilitaryBase } from "../types/militaryBase"

interface BaseMarkerProps {
  base: MilitaryBase
  onSelect: (base: MilitaryBase) => void
  isSelected: boolean
}

const BaseMarker: React.FC<BaseMarkerProps> = ({ base, onSelect, isSelected }) => {
  const getColor = (type: string) => {
    switch (type) {
      case "Army":
        return "#10B981" // green-500
      case "Air Force":
        return "#3B82F6" // blue-500
      case "Marine Corps":
        return "#F59E0B" // amber-500
      default:
        return "#6366F1" // indigo-500
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(base)
  }

  return (
    <g onClick={handleClick} className="cursor-pointer hover:opacity-80">
      {/* Outer glow */}
      <circle cx={base.coordinates.x} cy={base.coordinates.y} r="1.5" fill={getColor(base.type)} opacity="0.3" />

      {/* Main marker */}
      <circle
        cx={base.coordinates.x}
        cy={base.coordinates.y}
        r={isSelected ? "1" : "0.8"}
        fill={getColor(base.type)}
        opacity="0.9"
        stroke="#fff"
        strokeWidth="0.2"
      >
        {isSelected && <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite" />}
      </circle>

      {/* Pulse effect for selected marker */}
      {isSelected && (
        <circle
          cx={base.coordinates.x}
          cy={base.coordinates.y}
          r="1.2"
          fill="none"
          stroke={getColor(base.type)}
          opacity="0.5"
          strokeWidth="0.3"
        >
          <animate attributeName="r" values="1;2.5;1" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  )
}

export default BaseMarker

