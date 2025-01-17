import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
  import { useGameStore } from "@/stores/gameStore"
import { GameSetup } from "./GameSetup"
  
  export function ScoreBoard() {
    const { players } = useGameStore()
  
    // 실제로 점수가 입력된 라운드 수 계산
    const completedRounds = Math.max(...players.map(player => player.scores.length))
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>점수판</CardTitle>
            <GameSetup />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]	text-center">순위</TableHead>
                {Array.from({ length: completedRounds }, (_, i) => (
                  <TableHead key={i} className="text-center w-[80px]">R{i + 1}</TableHead>
                ))}
                <TableHead className="text-center w-[80px]">총점</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...players]
                .sort((a, b) => b.totalScore - a.totalScore)
                .map((player) => (
                  <TableRow key={player.name}>
                    <TableCell>{player.name}</TableCell>
                    {player.scores.slice(0, completedRounds).map((score, i) => (
                      <TableCell key={i} className="text-center">
                        {score}점
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold">
                      {player.totalScore}점
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }