import type React from "react"

interface ZoomControlProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

const ZoomControl: React.FC<ZoomControlProps> = ({ onZoomIn, onZoomOut, onReset }) => {
  return (
    <div className="absolute top-4 right-4 z-20 bg-slate-800 rounded-md p-2 flex flex-col">
      <button
        onClick={onZoomIn}
        className="bg-slate-700 text-white px-2 py-1 rounded mb-1 hover:bg-slate-600"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        onClick={onZoomOut}
        className="bg-slate-700 text-white px-2 py-1 rounded mb-1 hover:bg-slate-600"
        aria-label="Zoom out"
      >
        -
      </button>
      <button
        onClick={onReset}
        className="bg-slate-700 text-white px-2 py-1 rounded hover:bg-slate-600"
        aria-label="Reset view"
      >
        Reset
      </button>
    </div>
  )
}

export default ZoomControl

