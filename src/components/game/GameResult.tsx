import { useGameStore } from '@/stores/gameStore'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { IFunnelProps } from '@/interfaces/funnel'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '../ui/table'
import { calculateRank } from '@/lib/utils'


export function GameResult({ onNext }: IFunnelProps) {
  const { players, resetGame } = useGameStore()
  // 최고 점수 찾기
  const highestScore = Math.max(...players.map(player => player.totalScore))

  // 공동 우승자 찾기
  const winners = players.filter(player => player.totalScore === highestScore)
  const isCoWinner = winners.length > 1

  // 결과 페이지에서만 순위대로 정렬 (내림차순)
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore)

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">순위</TableHead>
                <TableHead className="w-[100px] text-center">이름</TableHead>
                <TableHead className="text-center w-[80px]">총점</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.map((player) => (
                <TableRow key={player.name} className="text-center">
                  <TableCell>{calculateRank(player, players)}위</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell className="font-bold">{player.totalScore}점</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button className="w-full" onClick={handleRestart}>
          새 게임 시작
        </Button>
      </CardContent>
    </Card>
  )
}
