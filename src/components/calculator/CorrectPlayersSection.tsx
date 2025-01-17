import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { IPlayer } from '@/interfaces/game'

interface CorrectPlayersSectionProps {
  players: IPlayer[]
  currentPlayerIndex: number
  correctPlayers: number[]
  onPlayerToggle: (playerIndex: number) => void
}

export function CorrectPlayersSection({
  players,
  currentPlayerIndex,
  correctPlayers,
  onPlayerToggle,
}: CorrectPlayersSectionProps) {
  return (
    <div className="space-y-2">
      <Label>맞춘 플레이어 선택</Label>
      <div className="grid grid-cols-2 gap-2">
        {players.map(
          (player, index) =>
            index !== currentPlayerIndex && (
              <Button
                key={index}
                variant={correctPlayers.includes(index) ? 'default' : 'outline'}
                onClick={() => onPlayerToggle(index)}
                size="sm"
              >
                {player.name}
              </Button>
            )
        )}
      </div>
    </div>
  )
}
