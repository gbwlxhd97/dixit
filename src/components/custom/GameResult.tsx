import { useGameStore } from "@/stores/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { IFunnelProps } from "@/interfaces/funnel"

export function GameResult({ onNext }: IFunnelProps) {
  const { players, resetGame } = useGameStore()
  
  // 승자 찾기
  const winner = players.reduce((prev, current) => 
    (prev.totalScore > current.totalScore) ? prev : current
  )

  const handleRestart = () => {
    resetGame()
    onNext()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>게임 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">승자: {winner.name}</h3>
          <p className="text-muted-foreground">총점: {winner.totalScore}점</p>
        </div>
        
        <div className="space-y-2">
          {players
            .sort((a, b) => b.totalScore - a.totalScore)
            .map((player, index) => (
              <div key={player.name} className="flex justify-between items-center">
                <span>{index + 1}위 {player.name}</span>
                <span>{player.totalScore}점</span>
              </div>
            ))}
        </div>

        <Button className="w-full" onClick={handleRestart}>
          새 게임 시작
        </Button>
      </CardContent>
    </Card>
  )
}