import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useGameStore } from "@/stores/gameStore"
import { Settings } from "lucide-react"
import { IFunnelProps } from "@/interfaces/funnel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GameSetupProps extends Partial<IFunnelProps> {
  variant?: 'dialog' | 'page'
}

export function GameSetup({ onNext, variant = 'page' }: GameSetupProps) {
  const { scoreSettings, setScoreSettings, defaultWinScore, setDefaultWinScore } = useGameStore()
  const [tempSettings, setTempSettings] = useState(scoreSettings)
  const [tempWinScore, setTempWinScore] = useState(defaultWinScore.toString())
  const [open, setOpen] = useState(false)

  const handleSettingChange = (
    category: keyof typeof scoreSettings,
    field: string,
    value: string
  ) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue)) {
      setTempSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: numValue
        }
      }))
    }
  }

  const handleWinScoreChange = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue > 0) {
      setTempWinScore(value)
    }
  }

  const handleConfirm = () => {
    setScoreSettings(tempSettings)
    setDefaultWinScore(parseInt(tempWinScore))
    if (variant === 'dialog') {
      setOpen(false)
    } else if (onNext) {
      onNext()
    }
  }

  const content = (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">승리 조건</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            value={tempWinScore}
            onChange={(e) => handleWinScoreChange(e.target.value)}
          />
          <span className="text-sm text-muted-foreground">점</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">모두 맞추거나 아무도 못 맞춘 경우</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">이야기꾼</label>
            <Input
              type="number"
              value={tempSettings.allCorrect.storyteller}
              onChange={(e) => handleSettingChange('allCorrect', 'storyteller', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">다른 플레이어</label>
            <Input
              type="number"
              value={tempSettings.allCorrect.others}
              onChange={(e) => handleSettingChange('allCorrect', 'others', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">일부만 맞춘 경우</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">이야기꾼</label>
            <Input
              type="number"
              value={tempSettings.someCorrect.storyteller}
              onChange={(e) => handleSettingChange('someCorrect', 'storyteller', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">맞춘 플레이어</label>
            <Input
              type="number"
              value={tempSettings.someCorrect.correct}
              onChange={(e) => handleSettingChange('someCorrect', 'correct', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">다른 플레이어 카드 맞춘 경우</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">맞춘 사람</label>
            <Input
              type="number"
              value={tempSettings.findOthers.finder}
              onChange={(e) => handleSettingChange('findOthers', 'finder', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">카드 주인</label>
            <Input
              type="number"
              value={tempSettings.findOthers.owner}
              onChange={(e) => handleSettingChange('findOthers', 'owner', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setTempSettings(scoreSettings)}
        >
          기본값으로 초기화
        </Button>
        <Button className="flex-1" onClick={handleConfirm}>
          {variant === 'dialog' ? '저장' : '다음'}
        </Button>
      </div>
    </div>
  )

  if (variant === 'dialog') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>게임 설정</DialogTitle>
          </DialogHeader>
          <CardContent>
            {content}
          </CardContent>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">게임 설정</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
} 