import { create } from 'zustand'

type WinCondition = 'score' | 'rounds'

interface GameSettings {
  winCondition: WinCondition
  targetScore: number
  maxRounds: number
  setWinCondition: (condition: WinCondition) => void
  setTargetScore: (score: number) => void
  setMaxRounds: (rounds: number) => void
}

export const useGameSettingsStore = create<GameSettings>(set => ({
  winCondition: 'score',
  targetScore: 500,
  maxRounds: 10,
  setWinCondition: condition => set({ winCondition: condition }),
  setTargetScore: score => set({ targetScore: score }),
  setMaxRounds: rounds => set({ maxRounds: rounds }),
}))
