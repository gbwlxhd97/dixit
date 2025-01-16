import { useState } from 'react'
import './App.css'
import { PlayerSetup } from './components/custom/PlayerSetup'
import { GameStart } from './components/custom/GameStart'

function App() {
  // TODO: 추후 hooks 형태로 분리
  const [step, setStep] = useState<"playerSetup"  | "gameStart" | "gameEnd">("playerSetup")

  return (
    <main className="w-full flex items-center justify-center">
      {
        step === "playerSetup" && <PlayerSetup onComplete={() => setStep("gameStart")} />
      }
      {step === "gameStart" && <GameStart />}
    </main>
  )
}

export default App
