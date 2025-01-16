import './App.css'
import { PlayerSetup } from './components/custom/PlayerSetup'
import { GameStart } from './components/custom/GameBoard'
import { GameResult } from './components/custom/GameResult'
import { useGameStore } from './stores/gameStore'

function App() {
  const { step, setStep } = useGameStore()

  return (
    <main className="w-full flex items-center justify-center">
      {step === "playerSetup" && <PlayerSetup onNext={() => setStep("gameStart")} />}
      {step === "gameStart" && <GameStart onNext={() => setStep("gameResult")} />}
      {step === "gameResult" && <GameResult onNext={() => setStep("playerSetup")} />}
    </main>
  )
}

export default App
