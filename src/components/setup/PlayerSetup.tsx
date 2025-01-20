import { useState, useRef, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useGameStore } from '@/stores/gameStore'
import { IFunnelProps } from '@/interfaces/funnel'
import { MIN_PLAYERS_COUNT } from '@/constants'

export function PlayerSetup({ onNext }: IFunnelProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']) // 4명 기본 설정
  const { setPlayers } = useGameStore()
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...playerNames]
    newPlayers[index] = name
    setPlayerNames(newPlayers)
  }

  const validPlayers = playerNames.filter(name => name.trim() !== '')
  const handleConfirm = () => {
    if (validPlayers.length >= MIN_PLAYERS_COUNT) {
      setPlayers(validPlayers)
      onNext()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center mb-6">플레이어 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {playerNames.map((player, index) => (
            <Input
              key={index}
              ref={index === 0 ? firstInputRef : null}
              placeholder={`플레이어 ${index + 1} 이름`}
              value={player}
              onChange={e => handlePlayerNameChange(index, e.target.value)}
            />
          ))}
          <Button
            className="w-full mt-4"
            onClick={handleConfirm}
            disabled={validPlayers.length < MIN_PLAYERS_COUNT}
          >
            게임 시작
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
