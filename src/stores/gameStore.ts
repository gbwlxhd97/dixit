import { DIXIT_STORAGE_KEY } from '@/constants'
import { IGameState } from '@/interfaces/game'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGameStore = create<IGameState>()(
  persist(
    set => ({
      step: 'onBoarding',
      players: [],
      currentRound: 1,
      currentPlayerIndex: 0, // 현재 이야기꾼 인덱스
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
          const newScores = [...newPlayers[playerIndex].scores, score];
          newPlayers[playerIndex] = {
            ...newPlayers[playerIndex],
            scores: newScores,
            totalScore: newScores.reduce((a, b) => a + b, 0),
          }

          return { players: newPlayers }
        }),

      nextRound: () =>
        set(state => ({
          currentRound: state.currentRound + 1,
          // 이야기꾼 인덱스를 다음 플레이어로 변경
          currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        })),

      resetGame: () =>
        set({
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
        }),
      setDefaultWinScore: score => set({ defaultWinScore: score }),
      setScoreSettings: settings => set({ scoreSettings: settings }),
    }),
    {
      name: DIXIT_STORAGE_KEY,
      version: 1,
    }
  )
)
