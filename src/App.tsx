import { useState } from 'react'
import './App.css'
import { PlayerSetup } from './components/custom/PlayerSetup'

function App() {
  // TODO: 추후 hooks 형태로 분리
  const [step, setStep] = useState<"playerSetup"  | "gameStart" | "gameEnd">("playerSetup")

  return (
    <main className="w-full flex items-center justify-center">
      {
        step === "playerSetup" && <PlayerSetup onComplete={() => setStep("gameStart")} />
      }
    </main>
  )
}

export default App
