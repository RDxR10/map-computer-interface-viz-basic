import type React from "react"

const Legend: React.FC = () => {
  const baseTypes = [
    { type: "Army", color: "#10B981" },
    { type: "Air Force", color: "#3B82F6" },
    { type: "Marine Corps", color: "#F59E0B" },
    { type: "Other", color: "#6366F1" },
  ]

  return (
    <div className="absolute bottom-4 right-4 bg-slate-800 p-4 rounded-md z-20">
      <h3 className="text-white font-bold mb-2">Legend</h3>
      {baseTypes.map((baseType) => (
        <div key={baseType.type} className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: baseType.color }}></div>
          <span className="text-white text-sm">{baseType.type}</span>
        </div>
      ))}
      <div className="mt-2">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full mr-2 bg-green-500 opacity-50"></div>
          <span className="text-white text-sm">Safe Area</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full mr-2 bg-red-500 opacity-50"></div>
          <span className="text-white text-sm">Enemy Area</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full mr-2 bg-yellow-500"></div>
          <span className="text-white text-sm">You are here</span>
        </div>
      </div>
    </div>
  )
}

export default Legend

