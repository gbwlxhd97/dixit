import { useState } from 'react'
import './App.css'
import { PlayerSetup } from './components/custom/PlayerSetup'
import { GameStart } from './components/custom/GameStart'
import { GameResult } from './components/custom/GameResult'

function App() {
  const [step, setStep] = useState<"playerSetup" | "gameStart" | "gameResult">("playerSetup")

  return (
    <main className="w-full flex items-center justify-center">
      {step === "playerSetup" && <PlayerSetup onNext={() => setStep("gameStart")} />}
      {step === "gameStart" && <GameStart onNext={() => setStep("gameResult")} />}
      {step === "gameResult" && <GameResult onNext={() => setStep("playerSetup")} />}
    </main>
  )
}

export default App
