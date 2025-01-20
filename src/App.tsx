import './App.css'
import { PlayerSetup } from './components/setup/PlayerSetup'
import { GameStart } from './components/game/GameBoard'
import { GameResult } from './components/game/GameResult'
import { useGameStore } from './stores/gameStore'
import { OnBoarding } from './components/onBoarding'
import { GameSetup } from './components/game/GameSetup'
import { ErrorBoundary } from './ErrorBoundary'
import { BuggyCounter } from './components/BuggyCounter'
import { useFunnel } from './hooks/useFunnel'

function App() {
  const [step, setStep, Funnel] = useFunnel([
    'onBoarding',
    'playerSetup',
    'gameSetup',
    'gameStart',
    'gameResult',
  ])

  return (
    <ErrorBoundary>
      {/* ErrorBoundary 테스트 아래 주석을 해제 하시면 확인 할 수 있습니다. */}
      {/* <BuggyCounter /> */}
      <main className="w-full min-h-screen flex items-center justify-center p-4">
        <Funnel>
          <Funnel.step name="onBoarding">
            <OnBoarding onNext={() => setStep('playerSetup')} />
          </Funnel.step>

          <Funnel.step name="playerSetup">
            <PlayerSetup onNext={() => setStep('gameSetup')} />
          </Funnel.step>

          <Funnel.step name="gameSetup">
            <GameSetup onNext={() => setStep('gameStart')} variant="page" />
          </Funnel.step>

          <Funnel.step name="gameStart">
            <GameStart onNext={() => setStep('gameResult')} />
          </Funnel.step>

          <Funnel.step name="gameResult">
            <GameResult onNext={() => setStep('playerSetup')} />
          </Funnel.step>
        </Funnel>
      </main>
    </ErrorBoundary>
  )
}

export default App
