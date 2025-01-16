import { create } from 'zustand'

interface Player {
  name: string
  scores: number[]
  totalScore: number
}

interface GameState {
  players: Player[]
  currentRound: number
  currentPlayerIndex: number
  // Actions
  setPlayers: (names: string[]) => void
  addScore: (playerIndex: number, score: number) => void
  nextRound: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  currentRound: 1,
  currentPlayerIndex: 0,

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
    // 총점 재계산
    newPlayers[playerIndex].totalScore = newPlayers[playerIndex].scores.reduce((a, b) => a + b, 0)
    
    return { players: newPlayers }
  }),

  nextRound: () => set((state) => ({
    currentRound: state.currentRound + 1,
    currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
  })),

  resetGame: () => set({
    players: [],
    currentRound: 1,
    currentPlayerIndex: 0
  })
}))