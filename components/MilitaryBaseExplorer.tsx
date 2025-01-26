"use client"

import React, { useState, useEffect, useCallback } from "react"
import type { MilitaryBase } from "../types/militaryBase"
import BaseMarker from "./BaseMarker"
import BaseDetailsPanel from "./BaseDetailsPanel"
import SearchBar from "./SearchBar"
import Legend from "./Legend"
import ZoomControl from "./ZoomControl"
import FilterControl from "./FilterControl"
import GeneralMessages from "./GeneralMessages"

const MilitaryBaseExplorer: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<MilitaryBase | null>(null)
  const [bases, setBases] = useState<MilitaryBase[]>([])
  const [filteredBases, setFilteredBases] = useState<MilitaryBase[]>([])
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showMessages, setShowMessages] = useState(false)

  const yourLocation = { x: 50, y: 50 }

  const predefinedBases: MilitaryBase[] = [
    {
      id: 1,
      name: "Fort Zephyr",
      state: "Aethoria",
      coordinates: { x: 30, y: 70 },
      personnel: 5200,
      description:
        "Strategic Army base located in a safe zone, serving as a vital support hub for military operations.",
      type: "Army",
    },
    {
      id: 2,
      name: "Camp Oceanus",
      state: "Celestia",
      coordinates: { x: 75, y: 25 },
      personnel: 42000,
      description: "Largest Marine Corps base, crucial for amphibious and ground combat training.",
      type: "Marine Corps",
    },
    {
      id: 3,
      name: "Fort Gaia",
      state: "Terranova",
      coordinates: { x: 55, y: 75 },
      personnel: 3500,
      description: "Historic Army installation with significant administrative and training functions.",
      type: "Army",
    },
    {
      id: 4,
      name: "Fort Phoenix",
      state: "Ignisia",
      coordinates: { x: 20, y: 20 },
      personnel: 35000,
      description: "Major Army base specializing in advanced artillery and operational training.",
      type: "Army",
    },
    {
      id: 5,
      name: "Skyguard Air Base",
      state: "Ventosa",
      coordinates: { x: 60, y: 60 },
      personnel: 6500,
      description: "Premier fighter pilot training base for the Air Force.",
      type: "Air Force",
    },
  ]

  useEffect(() => {
    setBases(predefinedBases)
    setFilteredBases(predefinedBases)
  }, [])

  useEffect(() => {
    const filtered = bases.filter((base) => activeFilters.length === 0 || activeFilters.includes(base.type))
    setFilteredBases(filtered)
  }, [bases, activeFilters])

  const handleBaseSelect = (base: MilitaryBase) => {
    setSelectedBase(base)
    setScale(2)
    setPosition({
      x: -base.coordinates.x * 2 + 50,
      y: -base.coordinates.y * 2 + 50,
    })
  }

  const handleSearch = useCallback(
    (searchTerm: string) => {
      const filtered = bases.filter(
        (base) =>
          base.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          base.state.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredBases(filtered)
    },
    [bases],
  )

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const newScale = scale + e.deltaY * -0.01
    setScale(Math.min(Math.max(0.5, newScale), 4))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setPosition({ x: position.x + dx, y: position.y + dy })
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale(Math.max(scale - 0.5, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setSelectedBase(null)
  }

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters)
  }

  const toggleMessages = () => {
    setShowMessages(!showMessages)
  }

  return (
    <div className="w-full h-full bg-[#0A0F1C] relative">
      <SearchBar onSearch={handleSearch} />
      <Legend />
      <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
      <FilterControl onFilterChange={handleFilterChange} />
      <button
        onClick={toggleMessages}
        className="absolute top-4 right-36 z-20 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {showMessages ? "Hide Messages" : "View Messages"}
      </button>
      <div
        className="w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {/* Background */}
          <rect width="100" height="100" fill="#0A0F1C" />

          {/* Gridlines */}
          <g stroke="#1E3A8A" strokeWidth="0.1" opacity="0.3">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <line x1={0} y1={i * 10} x2={100} y2={i * 10} />
                <line x1={i * 10} y1={0} x2={i * 10} y2={100} />
              </React.Fragment>
            ))}
          </g>

          {/* Safe areas */}
          <g fill="#10B981" opacity="0.2">
            <circle cx="30" cy="70" r="10" />
            <circle cx="75" cy="25" r="8" />
          </g>

          {/* Enemy areas */}
          <g fill="#EF4444" opacity="0.2">
            <circle cx="20" cy="20" r="7" />
            <circle cx="60" cy="60" r="9" />
            <circle cx="85" cy="80" r="6" />
          </g>

          {/* Base Markers */}
          {filteredBases.map((base) => (
            <BaseMarker
              key={base.id}
              base={base}
              onSelect={handleBaseSelect}
              isSelected={selectedBase?.id === base.id}
            />
          ))}

          {/* You are here marker */}
          <g transform={`translate(${yourLocation.x}, ${yourLocation.y})`}>
            <circle r="1.5" fill="#FBBF24" />
            <text x="2" y="0.5" fontSize="2" fill="#FBBF24" textAnchor="start" alignmentBaseline="middle">
              You are here
            </text>
          </g>
        </svg>
      </div>

      {selectedBase && (
        <BaseDetailsPanel base={selectedBase} onClose={() => setSelectedBase(null)} scale={scale} position={position} />
      )}

      {showMessages && <GeneralMessages onClose={() => setShowMessages(false)} />}
    </div>
  )
}

export default MilitaryBaseExplorer

