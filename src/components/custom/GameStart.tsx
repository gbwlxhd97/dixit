import { useGameStore } from "@/stores/gameStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function GameStart() {
  const { 
    players, 
    currentRound, 
    currentPlayerIndex, 
    addScore, 
    nextRound 
  } = useGameStore()

  const handleScoreSubmit = (playerIndex: number, score: string) => {
    const numberScore = parseInt(score, 10)
    if (!isNaN(numberScore)) {
      addScore(playerIndex, numberScore)
    }
  }
  const isAllScoresEntered = players.every(
    player => player.scores.length >= currentRound
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
                  onChange={(e) => handleScoreSubmit(index, e.target.value)}
                  value={player.scores[currentRound - 1] || ""}
                />
              </div>
            ))}
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={nextRound}
            disabled={!isAllScoresEntered}
          >
            다음 라운드
          </Button>
        </CardContent>
      </Card>

{/* TODO: 총 점수판 추후 분리 */}
      <Card>
        <CardHeader>
          <CardTitle>점수판</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">플레이어</th>
                  {Array.from({ length: currentRound }, (_, i) => (
                    <th key={i} className="text-center">R{i + 1}</th>
                  ))}
                  <th className="text-right">총점</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.name}>
                    <td className="text-left">{player.name}</td>
                    {player.scores.map((score, i) => (
                      <td key={i} className="text-center">{score || "-"}</td>
                    ))}
                    <td className="text-right font-bold">{player.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}