import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useGameStore } from '@/stores/gameStore'
import { toast } from 'sonner'
import { MainScoreSection } from './MainScoreSection'
import { CorrectPlayersSection } from './CorrectPlayersSection'
import { OtherCardsSection } from './OtherCardsSection'
import { PLAYER_CASES } from '@/constants'
import { PlayerCaseType } from '@/interfaces/game'

interface Props {
  onScoreCalculated: (scores: { [key: number]: string }) => void
}

export function ScoreCalculator({ onScoreCalculated }: Props) {
  const { players, currentPlayerIndex, scoreSettings } = useGameStore()
  const [mainCase, setMainCase] = useState<PlayerCaseType | null>(null)
  const [isOtherCardsFound, setIsOtherCardsFound] = useState(false)
  const [correctPlayers, setCorrectPlayers] = useState<number[]>([])
  const [foundCards, setFoundCards] = useState<{ [key: number]: number[] }>({})
  const [open, setOpen] = useState(false)

  const handleMainCaseSelect = (value: PlayerCaseType) => {
    setMainCase(value)
    setCorrectPlayers([])
  }

  const handlePlayerToggle = (playerIndex: number) => {
    setCorrectPlayers(prev =>
      prev.includes(playerIndex) ? prev.filter(p => p !== playerIndex) : [...prev, playerIndex]
    )
  }

  const handleFoundCardToggle = (finderIndex: number, ownerIndex: number) => {
    setFoundCards(prev => {
      const finderCards = prev[finderIndex] || []
      return {
        ...prev,
        [finderIndex]: finderCards.includes(ownerIndex)
          ? finderCards.filter(o => o !== ownerIndex)
          : [...finderCards, ownerIndex],
      }
    })
  }

  const resetState = () => {
    setMainCase(null)
    setIsOtherCardsFound(false)
    setCorrectPlayers([])
    setFoundCards({})
  }

  const calculateScores = () => {
    const scores: { [key: number]: number } = {}

    // 초기화
    players.forEach((_, index) => {
      scores[index] = 0
    })

    // 메인 케이스 점수 계산
    if (mainCase === PLAYER_CASES.ALL_CORRECT) {
      scores[currentPlayerIndex] = scoreSettings.allCorrect.storyteller
      players.forEach((_, index) => {
        if (index !== currentPlayerIndex) {
          scores[index] = scoreSettings.allCorrect.others
        }
      })
    } else if (mainCase === PLAYER_CASES.SOME_CORRECT) {
      scores[currentPlayerIndex] = scoreSettings.someCorrect.storyteller
      correctPlayers.forEach(playerIndex => {
        scores[playerIndex] = scoreSettings.someCorrect.correct
      })
    }

    // 다른 카드 맞춘 경우 추가 점수 계산
    if (isOtherCardsFound && Object.keys(foundCards).length > 0) {
      Object.entries(foundCards).forEach(([_, owners]) => {
        owners.forEach(ownerIndex => {
          scores[ownerIndex] = (scores[ownerIndex] || 0) + scoreSettings.findOthers.owner
        })
      })
    }

    const stringScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, String(value)])
    )
    onScoreCalculated(stringScores)
    setOpen(false)
    resetState()
    toast.success('점수가 계산되었습니다!')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen)
        if (!isOpen) {
          resetState()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          점수 계산하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>점수 계산</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <MainScoreSection mainCase={mainCase} onMainCaseSelect={handleMainCaseSelect} />

          {/* 일부만 정답을 맞췄을 경우 */}
          {mainCase === PLAYER_CASES.SOME_CORRECT && (
            <CorrectPlayersSection
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              correctPlayers={correctPlayers}
              onPlayerToggle={handlePlayerToggle}
            />
          )}

          <OtherCardsSection
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            isOtherCardsFound={isOtherCardsFound}
            foundCards={foundCards}
            onOtherCardsChange={setIsOtherCardsFound}
            onFoundCardsChange={handleFoundCardToggle}
          />

          <Button
            className="w-full"
            onClick={calculateScores}
            disabled={
              !mainCase ||
              (mainCase === PLAYER_CASES.SOME_CORRECT && correctPlayers.length === 0) ||
              (isOtherCardsFound && Object.keys(foundCards).length === 0)
            }
          >
            계산하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
