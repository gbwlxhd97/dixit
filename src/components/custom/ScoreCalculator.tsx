import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useGameStore } from "@/stores/gameStore"
import { toast } from "sonner"
import { Checkbox } from "../ui/checkbox"

interface Props {
  onScoreCalculated: (scores: { [key: number]: string }) => void
}

export function ScoreCalculator({ onScoreCalculated }: Props) {
  const { players, currentPlayerIndex, scoreSettings } = useGameStore()
  const [mainCase, setMainCase] = useState<"allCorrect" | "someCorrect" | null>(null)
  const [isOtherCardsFound, setIsOtherCardsFound] = useState(false)
  const [correctPlayers, setCorrectPlayers] = useState<number[]>([])
  const [foundCards, setFoundCards] = useState<{[key: number]: number[]}>({})
  const [open, setOpen] = useState(false)

  const handleMainCaseSelect = (value: string) => {
    setMainCase(value as "allCorrect" | "someCorrect")
    setCorrectPlayers([])
  }

  const handlePlayerToggle = (playerIndex: number) => {
    setCorrectPlayers(prev => 
      prev.includes(playerIndex)
        ? prev.filter(p => p !== playerIndex)
        : [...prev, playerIndex]
    )
  }

  const handleFoundCardToggle = (finderIndex: number, ownerIndex: number) => {
    setFoundCards(prev => {
      const finderCards = prev[finderIndex] || []
      return {
        ...prev,
        [finderIndex]: finderCards.includes(ownerIndex)
          ? finderCards.filter(o => o !== ownerIndex)
          : [...finderCards, ownerIndex]
      }
    })
  }

  const resetState = () => {
    setMainCase(null)
    setIsOtherCardsFound(false)
    setCorrectPlayers([])
    setFoundCards({})
  }

  const calculateScores = () => {
    const scores: { [key: number]: number } = {}
    
    // 초기화
    players.forEach((_, index) => {
      scores[index] = 0
    })

    // 메인 케이스 점수 계산
    if (mainCase === "allCorrect") {
      scores[currentPlayerIndex] = scoreSettings.allCorrect.storyteller
      players.forEach((_, index) => {
        if (index !== currentPlayerIndex) {
          scores[index] = scoreSettings.allCorrect.others
        }
      })
    } else if (mainCase === "someCorrect") {
      scores[currentPlayerIndex] = scoreSettings.someCorrect.storyteller
      correctPlayers.forEach(playerIndex => {
        scores[playerIndex] = scoreSettings.someCorrect.correct
      })
    }

    // 다른 카드 맞춘 경우 추가 점수 계산
    if (isOtherCardsFound && Object.keys(foundCards).length > 0) {
      Object.entries(foundCards).forEach(([_, owners]) => {
        owners.forEach(ownerIndex => {
          scores[ownerIndex] = (scores[ownerIndex] || 0) + scoreSettings.findOthers.owner
        })
      })
    }

    const stringScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, String(value)])
    )
    onScoreCalculated(stringScores)
    setOpen(false)
    resetState()
    toast.success("점수가 계산되었습니다!")
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          resetState()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">점수 계산하기</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>점수 계산</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>메인 점수</Label>
            <RadioGroup value={mainCase || ""} onValueChange={handleMainCaseSelect}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="allCorrect" id="allCorrect" />
                <Label htmlFor="allCorrect">모두 맞추거나 아무도 못 맞춤</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="someCorrect" id="someCorrect" />
                <Label htmlFor="someCorrect">일부만 맞춤</Label>
              </div>
            </RadioGroup>
          </div>

          {mainCase === "someCorrect" && (
            <div className="space-y-2">
              <Label>맞춘 플레이어 선택</Label>
              <div className="grid grid-cols-2 gap-2">
                {players.map((player, index) => (
                  index !== currentPlayerIndex && (
                    <Button
                      key={index}
                      variant={correctPlayers.includes(index) ? "default" : "outline"}
                      onClick={() => handlePlayerToggle(index)}
                      size="sm"
                    >
                      {player.name}
                    </Button>
                  )
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="otherCards"
                checked={isOtherCardsFound}
                onCheckedChange={(checked) => setIsOtherCardsFound(checked as boolean)}
              />
              <Label htmlFor="otherCards">다른 플레이어 카드 맞춤</Label>
            </div>
          </div>

          {isOtherCardsFound && (
            <div className="space-y-2">
              <Label>카드를 맞춘 경우 선택</Label>
              <div className="grid gap-4">
                {players.map((finder, finderIndex) => (
                  finderIndex !== currentPlayerIndex && (
                    <div key={finderIndex} className="space-y-2">
                      <Label>{finder.name}이(가) 맞춘 카드:</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {players.map((owner, ownerIndex) => (
                          ownerIndex !== currentPlayerIndex && ownerIndex !== finderIndex && (
                            <Button
                              key={ownerIndex}
                              variant={foundCards[finderIndex]?.[0] === ownerIndex ? "default" : "outline"}
                              onClick={() => {
                                const newFoundCards = { ...foundCards };
                                newFoundCards[finderIndex] = [ownerIndex];
                                setFoundCards(newFoundCards);
                              }}
                              size="sm"
                            >
                              {owner.name}
                            </Button>
                          )
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={calculateScores}
            disabled={!mainCase || 
              (mainCase === "someCorrect" && correctPlayers.length === 0) ||
              (isOtherCardsFound && Object.keys(foundCards).length === 0)
            }
          >
            계산하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 