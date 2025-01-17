import { Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useGameStore } from "@/stores/gameStore"
import { Input } from "../ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { IFunnelProps } from "@/interfaces/funnel"

export function GameSetup({ onNext }: IFunnelProps) {
  const { resetGame, defaultWinScore, setDefaultWinScore } = useGameStore()
  const [tempWinScore, setTempWinScore] = useState(defaultWinScore.toString())
  const [open, setOpen] = useState(false)

  const handleScoreChange = (value: string) => {
    const numberValue = parseInt(value)
    if (!isNaN(numberValue) && numberValue > 0) {
      setTempWinScore(value)
      setDefaultWinScore(numberValue)
    }
  }

  const handleWinScoreChange = () => {
    setDefaultWinScore(parseInt(tempWinScore))
    toast.success("승리 조건이 변경되었습니다!")
    setOpen(false)
  }

  const handleReset = () => {
    resetGame()
    toast.success("게임이 초기화되었습니다!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게임 설정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">승리 조건 변경</h4>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={tempWinScore}
                onChange={(e) => handleScoreChange(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">점</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleWinScoreChange}
            >
              승리 조건 변경
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleReset}
            >
              게임 리셋
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}