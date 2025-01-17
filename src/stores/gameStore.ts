import { IGameState } from '@/interfaces/game'
import { create } from 'zustand'

export const useGameStore = create<IGameState>()(
  // persist(
  set => ({
    step: 'onBoarding',
    players: [],
    currentRound: 1,
    currentPlayerIndex: 0,
    defaultWinScore: 30,
    scoreSettings: {
      allCorrect: { storyteller: 0, others: 2 },
      someCorrect: { storyteller: 3, correct: 3 },
      findOthers: { finder: 0, owner: 1 },
    },
    setStep: step => set({ step }),

    setPlayers: names =>
      set({
        players: names.map(name => ({
          name,
          scores: [],
          totalScore: 0,
        })),
      }),

    addScore: (playerIndex, score) =>
      set(state => {
        const newPlayers = [...state.players]
        newPlayers[playerIndex] = {
          ...newPlayers[playerIndex],
          scores: [
            ...newPlayers[playerIndex].scores.slice(0, state.currentRound - 1),
            score,
            ...newPlayers[playerIndex].scores.slice(state.currentRound),
          ],
        }
        newPlayers[playerIndex].totalScore = newPlayers[playerIndex].scores.reduce(
          (a, b) => a + b,
          0
        )

        return { players: newPlayers }
      }),

    nextRound: () =>
      set(state => ({
        currentRound: state.currentRound + 1,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      })),

    resetGame: () =>
      set({
        step: 'onBoarding',
        players: [],
        currentRound: 1,
        currentPlayerIndex: 0,
        defaultWinScore: 30,
      }),
    setDefaultWinScore: score => set({ defaultWinScore: score }),
    setScoreSettings: settings => set({ scoreSettings: settings }),
  })
  // {
  //   name: DIXIT_STORAGE_KEY,
  //   version: 1,
  // }
  // )
)
