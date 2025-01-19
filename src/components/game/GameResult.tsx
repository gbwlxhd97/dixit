import { useGameStore } from '@/stores/gameStore'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { IFunnelProps } from '@/interfaces/funnel'

export function GameResult({ onNext }: IFunnelProps) {
  const { players, resetGame } = useGameStore()
  // 최고 점수 찾기
  const highestScore = Math.max(...players.map(player => player.totalScore))

  // 공동 우승자 찾기
  const winners = players.filter(player => player.totalScore === highestScore)
  const isCoWinner = winners.length > 1

  const sortedPlayers = players.sort((a, b) => b.totalScore - a.totalScore)

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
          <h3 className="text-2xl font-bold mb-2">
            {isCoWinner ? '공동 우승' : '우승'}: {winners.map(w => w.name).join(', ')}
          </h3>
          <p className="text-muted-foreground">총점: {highestScore}점</p>
        </div>

        <div className="space-y-2">
          {sortedPlayers.map((player, _, sortedPlayers) => {
            // 동점자 처리를 위한 순위 계산
            const currentRank = sortedPlayers.findIndex(p => p.totalScore === player.totalScore) + 1

            return (
              <div key={player.name} className="flex justify-between items-center">
                <span>
                  {currentRank}위 {player.name}
                </span>
                <span>{player.totalScore}점</span>
              </div>
            )
          })}
        </div>

        <Button className="w-full" onClick={handleRestart}>
          새 게임 시작
        </Button>
      </CardContent>
    </Card>
  )
}
