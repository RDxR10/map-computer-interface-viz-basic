import type React from "react"

interface GeneralMessagesProps {
  onClose: () => void
}

const GeneralMessages: React.FC<GeneralMessagesProps> = ({ onClose }) => {
  const messages = [
    {
      id: 1,
      title: "Operation Thunderbolt",
      content: "Secure the perimeter around Fort Zephyr. Enemy activity detected in the vicinity.",
    },
    {
      id: 2,
      title: "Supply Chain Update",
      content: "Reinforcements en route to Camp Oceanus. ETA: 0600 hours.",
    },
    {
      id: 3,
      title: "Intel Report",
      content: "Suspicious movement near Skyguard Air Base. Increase surveillance immediately.",
    },
    {
      id: 4,
      title: "Mission Briefing",
      content: "Prepare for joint operation with Fort Gaia. Details to follow in encrypted transmission.",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-slate-800 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Messages from General</h2>
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id} className="bg-slate-700 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">{message.title}</h3>
              <p className="text-white">{message.content}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Close Messages
        </button>
      </div>
    </div>
  )
}

export default GeneralMessages

