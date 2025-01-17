import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Player } from '@/stores/gameStore'

interface OtherCardsSectionProps {
  players: Player[]
  currentPlayerIndex: number
  isOtherCardsFound: boolean
  foundCards: { [key: number]: number[] }
  onOtherCardsChange: (checked: boolean) => void
  onFoundCardsChange: (finderIndex: number, ownerIndex: number) => void
}

export function OtherCardsSection({
  players,
  currentPlayerIndex,
  isOtherCardsFound,
  foundCards,
  onOtherCardsChange,
  onFoundCardsChange,
}: OtherCardsSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="otherCards"
          checked={isOtherCardsFound}
          onCheckedChange={checked => onOtherCardsChange(checked as boolean)}
        />
        <Label htmlFor="otherCards">다른 플레이어 카드 맞춤</Label>
      </div>

      {isOtherCardsFound && (
        <div className="space-y-2">
          <Label>카드를 맞춘 경우 선택</Label>
          <div className="grid gap-4">
            {players.map(
              (finder, finderIndex) =>
                finderIndex !== currentPlayerIndex && (
                  <div key={finderIndex} className="space-y-2">
                    <Label>{finder.name}이(가) 맞춘 카드:</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {players.map(
                        (owner, ownerIndex) =>
                          ownerIndex !== currentPlayerIndex &&
                          ownerIndex !== finderIndex && (
                            <Button
                              key={ownerIndex}
                              variant={
                                foundCards[finderIndex]?.[0] === ownerIndex ? 'default' : 'outline'
                              }
                              onClick={() => onFoundCardsChange(finderIndex, ownerIndex)}
                              size="sm"
                            >
                              {owner.name}
                            </Button>
                          )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
