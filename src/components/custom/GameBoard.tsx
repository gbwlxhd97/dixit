import { useGameStore } from "@/stores/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IFunnelProps } from "@/interfaces/funnel"
import { useState } from "react"
import { toast } from "sonner"
import { ScoreBoard } from "./ScoreBoard"

const DEFAULT_WINNER_SCORE = 30

export function GameStart({ onNext }: IFunnelProps) {
  const { 
    players, 
    currentRound, 
    currentPlayerIndex, 
    addScore, 
    nextRound 
  } = useGameStore()

  const [tempScores, setTempScores] = useState<{ [key: number]: string }>({})

  const handleScoreChange = (playerIndex: number, score: string) => {
    setTempScores(prev => ({
      ...prev,
      [playerIndex]: score
    }))
  }

  const handleNextRound = () => {
    const updatedScores: number[] = []
    
    Object.entries(tempScores).forEach(([playerIndex, score]) => {
      const numberScore = parseInt(score, 10)
      if (!isNaN(numberScore)) {
        addScore(parseInt(playerIndex), numberScore)
        // 현재 플레이어의 총점 계산
        const playerTotalScore = players[parseInt(playerIndex)].totalScore + numberScore
        updatedScores[parseInt(playerIndex)] = playerTotalScore
      }
    })

    const hasWinner = updatedScores.some(score => score >= DEFAULT_WINNER_SCORE)
    
    if (hasWinner) {
      toast.success("게임이 종료되었습니다!")
      onNext()
      return
    }

    setTempScores({})
    nextRound()
  }

  // 모든 플레이어가 점수를 입력했는지 확인
  const isAllScoresEntered = players.every(
    (_, index) => tempScores[index] !== undefined && tempScores[index] !== ""
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>라운드 {currentRound}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            현재 이야기꾼: {players[currentPlayerIndex]?.name}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {players.map((player, index) => (
              <div key={player.name} className="flex items-center gap-4">
                <span className="min-w-24">{player.name}</span>
                <Input
                  type="number"
                  placeholder="점수 입력"
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  value={tempScores[index] || ""}
                />
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={handleNextRound}
            disabled={!isAllScoresEntered}
          >
            다음 라운드
          </Button>
        </CardContent>
      </Card>
			<ScoreBoard />
    </div>
  )
}