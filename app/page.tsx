import MilitaryBaseExplorer from "../components/MilitaryBaseExplorer"

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0A0F1C]">
      <style jsx global>{`
        svg {
          shape-rendering: geometricPrecision;
          text-rendering: geometricPrecision;
        }
      `}</style>
      <MilitaryBaseExplorer />
    </main>
  )
}

