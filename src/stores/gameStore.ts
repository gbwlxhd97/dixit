import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Step = "onBoarding" | "playerSetup" | "gameSetup" | "gameStart" | "gameResult"

interface Player {
  name: string
  scores: number[]
  totalScore: number
}

interface GameState {
  step: Step
  players: Player[]
  currentRound: number
  currentPlayerIndex: number
  defaultWinScore: number
  // Actions
  setStep: (step: Step) => void
  setPlayers: (names: string[]) => void
  addScore: (playerIndex: number, score: number) => void
  nextRound: () => void
  resetGame: () => void
  setDefaultWinScore: (score: number) => void
}

const DIXIT_STORAGE_KEY = "dixit-game-storage"

export const useGameStore = create<GameState>()(
  // persist(
    (set) => ({
      step: "onBoarding",
      players: [],
      currentRound: 1,
      currentPlayerIndex: 0,
      defaultWinScore: 30,
      setStep: (step) => set({ step }),

      setPlayers: (names) => set({
        players: names.map(name => ({
          name,
          scores: [],
          totalScore: 0
        }))
      }),

      addScore: (playerIndex, score) => set((state) => {
        const newPlayers = [...state.players]
        newPlayers[playerIndex] = {
          ...newPlayers[playerIndex],
          scores: [
            ...newPlayers[playerIndex].scores.slice(0, state.currentRound - 1),
            score,
            ...newPlayers[playerIndex].scores.slice(state.currentRound)
          ]
        }
        newPlayers[playerIndex].totalScore = newPlayers[playerIndex].scores.reduce((a, b) => a + b, 0)
        
        return { players: newPlayers }
      }),

      nextRound: () => set((state) => ({
        currentRound: state.currentRound + 1,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
      })),

      resetGame: () => set({
        step: "onBoarding",
        players: [],
        currentRound: 1,
        currentPlayerIndex: 0,
        defaultWinScore: 30
      }),
      setDefaultWinScore: (score) => set({ defaultWinScore: score }),
    }),
    // {
    //   name: DIXIT_STORAGE_KEY,
    //   version: 1,
    // }
  // )
)