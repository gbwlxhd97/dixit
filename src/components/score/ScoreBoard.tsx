import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useGameStore } from '@/stores/gameStore'
import { GameSetup } from '../game/GameSetup'

export function ScoreBoard() {
  const { players } = useGameStore()

  // 실제로 점수가 입력된 라운드 수 계산
  const completedRounds = Math.max(...players.map(player => player.scores.length))

  // 표시할 점수 배열 계산 undefined 방지
  const displayScores = players.map(player => player.scores.slice(0, completedRounds))
  const displayRounds = Array.from({ length: completedRounds })
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>점수판</CardTitle>
        <GameSetup variant="dialog" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]	text-center">순위</TableHead>
              {displayRounds.map((_, i) => (
                <TableHead key={i} className="text-center w-[80px]">
                  {`R${i + 1}`}
                </TableHead>
              ))}
              <TableHead className="text-center w-[80px]">총점</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((player, playerIndex) => (
                <TableRow key={player.name} className="text-center">
                  <TableCell>{player.name}</TableCell>
                  {displayScores[playerIndex].map((score, i) => (
                    <TableCell key={i} className="text-center">
                      {score}점
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold">{player.totalScore}점</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
