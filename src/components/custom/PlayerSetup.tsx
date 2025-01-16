import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useGameStore } from "@/stores/gameStore"

interface PlayerSetupProps {
  onComplete: () => void
}

export function PlayerSetup({ onComplete }: PlayerSetupProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""])
  const setPlayers = useGameStore(state => state.setPlayers)
  
  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...playerNames]
    newPlayers[index] = name
    setPlayerNames(newPlayers)
  }

  const handleConfirm = () => {
    const validPlayers = playerNames.filter(name => name.trim() !== "")
    if (validPlayers.length >= 2) {
      setPlayers(validPlayers)
      onComplete()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">플레이어 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {playerNames.map((player, index) => (
            <Input
              key={index}
              placeholder={`플레이어 ${index + 1} 이름`}
              value={player}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            />
          ))}
          <Button 
            className="w-full mt-4"
            onClick={handleConfirm}
            disabled={playerNames.filter(name => name.trim() !== "").length !== 4}
          >
            게임 시작
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}