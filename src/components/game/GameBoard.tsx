import { useGameStore } from '@/stores/gameStore'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IFunnelProps } from '@/interfaces/funnel'
import { useState } from 'react'
import { toast } from 'sonner'
import { ScoreBoard } from '../score/ScoreBoard'
import { ScoreCalculator } from '@/components/calculator'

export function GameStart({ onNext }: IFunnelProps) {
  const { players, currentRound, currentPlayerIndex, addScore, nextRound, defaultWinScore } =
    useGameStore()

  const [tempScores, setTempScores] = useState<{ [key: number]: string }>({})

  const handleScoreChange = (playerIndex: number, score: string) => {
    setTempScores(prev => ({
      ...prev,
      [playerIndex]: score,
    }))
  }

  const handleNextRound = () => {
    const updatedScores: number[] = []

    Object.entries(tempScores).forEach(([playerIndex, score]) => {
      const numberScore = parseInt(score, 10)
      addScore(parseInt(playerIndex), numberScore)
      const playerTotalScore = players[parseInt(playerIndex)].totalScore + numberScore
      updatedScores[parseInt(playerIndex)] = playerTotalScore
    })

    const hasWinner = updatedScores.some(score => score >= defaultWinScore)

    if (hasWinner) {
      toast.success('게임이 종료되었습니다!')
      onNext()
      return
    }

    setTempScores({})
    nextRound()
  }

  // 모든 플레이어가 점수를 입력했는지 확인
  const isAllScoresEntered = players.every(
    (_, index) => tempScores[index] !== undefined && tempScores[index] !== ''
  )

  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>라운드 {currentRound}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            현재 이야기꾼: <span className="font-bold">{players[currentPlayerIndex]?.name}</span>
          </p>
          <div className="grid grid-cols-1 gap-4">
            {players.map((player, index) => (
              <div key={player.name} className="flex items-center gap-4">
                <span className="min-w-24">{player.name}</span>
                <Input
                  type="number"
                  placeholder="점수"
                  disabled
                  onChange={e => handleScoreChange(index, e.target.value)}
                  value={tempScores[index] || ''}
                />
              </div>
            ))}
            <ScoreCalculator onScoreCalculated={setTempScores} />
            <Button className="w-full" onClick={handleNextRound} disabled={!isAllScoresEntered}>
              라운드 종료
            </Button>
          </div>
        </CardContent>
      </Card>
      <ScoreBoard />
    </div>
  )
}
