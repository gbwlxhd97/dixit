import { Step } from './funnel'

export interface IPlayer {
  name: string
  scores: number[]
  totalScore: number
}

export interface IScoreSettings {
  allCorrect: { storyteller: number; others: number }
  someCorrect: { storyteller: number; correct: number }
  findOthers: { finder: number; owner: number }
}

export interface IGameState {
  step: Step
  players: IPlayer[]
  currentRound: number
  currentPlayerIndex: number
  defaultWinScore: number
  scoreSettings: IScoreSettings
  // Actions
  setStep: (step: Step) => void
  setPlayers: (names: string[]) => void
  addScore: (playerIndex: number, score: number) => void
  nextRound: () => void
  resetGame: () => void
  setDefaultWinScore: (score: number) => void
  setScoreSettings: (settings: IScoreSettings) => void
}
