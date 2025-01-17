type Step = 'onBoarding' | 'playerSetup' | 'gameSetup' | 'gameStart' | 'gameResult'

export interface Player {
  name: string
  scores: number[]
  totalScore: number
}

export interface ScoreSettings {
  allCorrect: { storyteller: number; others: number }
  someCorrect: { storyteller: number; correct: number }
  findOthers: { finder: number; owner: number }
}

export interface GameState {
  step: Step
  players: Player[]
  currentRound: number
  currentPlayerIndex: number
  defaultWinScore: number
  scoreSettings: ScoreSettings
    // Actions
    setStep: (step: Step) => void
    setPlayers: (names: string[]) => void
    addScore: (playerIndex: number, score: number) => void
    nextRound: () => void
    resetGame: () => void
    setDefaultWinScore: (score: number) => void
    setScoreSettings: (settings: ScoreSettings) => void
  }