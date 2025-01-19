import './App.css'
import { PlayerSetup } from './components/setup/PlayerSetup'
import { GameStart } from './components/game/GameBoard'
import { GameResult } from './components/game/GameResult'
import { useGameStore } from './stores/gameStore'
import { OnBoarding } from './components/onBoarding'
import { GameSetup } from './components/game/GameSetup'

function App() {
  const { step, setStep } = useGameStore()

  return (
    // TODO FUNNEL HOOKS 분리
      <main className="w-full min-h-screen flex items-center justify-center p-4">
      {step === 'onBoarding' && <OnBoarding onNext={() => setStep('playerSetup')} />}
      {step === 'playerSetup' && <PlayerSetup onNext={() => setStep('gameSetup')} />}
      {step === 'gameSetup' && <GameSetup onNext={() => setStep('gameStart')} variant="page" />}
      {step === 'gameStart' && <GameStart onNext={() => setStep('gameResult')} />}
      {step === 'gameResult' && <GameResult onNext={() => setStep('playerSetup')} />}
    </main>
  )
}

export default App
