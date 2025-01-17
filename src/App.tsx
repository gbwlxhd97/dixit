import './App.css'
import { PlayerSetup } from './components/custom/PlayerSetup'
import { GameStart } from './components/custom/GameBoard'
import { GameResult } from './components/custom/GameResult'
import { useGameStore } from './stores/gameStore'
import { OnBoarding } from './components/custom/OnBoarding'
import { GameSetup } from './components/custom/GameSetup'
import { GameSetup2 } from './components/custom/GameSetup2'

function App() {
  const { step, setStep } = useGameStore()

  return (
    <main className="w-full flex items-center justify-center">
      {step === "onBoarding" && <OnBoarding onNext={() => setStep("playerSetup")} />}
      {step === "playerSetup" && <PlayerSetup onNext={() => setStep("gameSetup")} />}
      {/* {step === "gameSetup" && <GameSetup onNext={() => setStep("gameStart")} />} */}
      {step === "gameSetup" && <GameSetup2 onNext={() => setStep("gameStart")} />}
      {step === "gameStart" && <GameStart onNext={() => setStep("gameResult")} />}
      {step === "gameResult" && <GameResult onNext={() => setStep("playerSetup")} />}
    </main>
  )
}

export default App
