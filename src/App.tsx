import './App.css'
import { PlayerSetup } from './components/setup/PlayerSetup'
import { GameStart } from './components/game/GameBoard'
import { GameResult } from './components/game/GameResult'
import { useGameStore } from './stores/gameStore'
import { OnBoarding } from './components/onBoarding'
import { GameSetup } from './components/game/GameSetup'
import { ErrorBoundary } from './ErrorBoundary'
import { BuggyCounter } from './components/BuggyCounter'
function App() {
  const { step, setStep } = useGameStore()

  return (
    // TODO FUNNEL HOOKS 분리
    <ErrorBoundary>
      {/* ErrorBoundary 테스트 아래 주석을 해제 하시면 확인 할 수 있습니다. */}
      {/* <BuggyCounter /> */}
      <main className="w-full min-h-screen flex items-center justify-center p-4">
        {step === 'onBoarding' && <OnBoarding onNext={() => setStep('playerSetup')} />}
        {step === 'playerSetup' && <PlayerSetup onNext={() => setStep('gameSetup')} />}
        {step === 'gameSetup' && <GameSetup onNext={() => setStep('gameStart')} variant="page" />}
        {step === 'gameStart' && <GameStart onNext={() => setStep('gameResult')} />}
        {step === 'gameResult' && <GameResult onNext={() => setStep('playerSetup')} />}
      </main>
    </ErrorBoundary>
  )
}

export default App
