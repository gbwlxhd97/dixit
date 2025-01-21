import { useMemo } from 'react'
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

  const { displayScores, displayRounds } = useMemo(() => {
    const maxRounds = Math.max(...players.map(player => player.scores.length))
    return {
      // 게임 계산 도중 점수판과 라운드가 다른 경우 라운드 수를 맞추기 위해 slice 하여 표시
      displayScores: players.map(player => player.scores.slice(0, maxRounds)),
      displayRounds: Array.from({ length: maxRounds }),
    }
  }, [players])

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
              <TableHead className="w-[100px]	text-center">이름</TableHead>
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
                <TableRow key={playerIndex} className="text-center">
                  <TableCell>{playerIndex + 1}</TableCell>
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
