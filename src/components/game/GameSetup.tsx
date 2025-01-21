import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useGameStore } from '@/stores/gameStore'
import { Settings } from 'lucide-react'
import { IFunnelProps } from '@/interfaces/funnel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { GameScoreSetting } from './setup/GameScoreSetting'

interface GameSetupProps extends Partial<IFunnelProps> {
  variant?: 'dialog' | 'page'
}

export function GameSetup({ onNext, variant = 'page' }: GameSetupProps) {
  const { scoreSettings, setScoreSettings, defaultWinScore, setDefaultWinScore, resetGame } =
    useGameStore()
  const [tempSettings, setTempSettings] = useState(scoreSettings)
  const [tempWinScore, setTempWinScore] = useState(defaultWinScore.toString())
  const [open, setOpen] = useState(false)

  const handleSettingChange = (
    category: keyof typeof scoreSettings,
    field: string,
    value: string
  ) => {
    const numValue = parseInt(value)
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: numValue,
      },
    }))
  }

  const handleWinScoreChange = (value: string) => {
    setTempWinScore(value)
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
            onChange={e => handleWinScoreChange(e.target.value)}
          />
          <span className="text-sm text-muted-foreground">점</span>
        </div>
      </div>
      <GameScoreSetting
        title="모두 맞추거나 아무도 못 맞춘 경우"
        fields={[
          { key: 'storyteller', label: '이야기꾼' },
          { key: 'others', label: '다른 플레이어' },
        ]}
        values={tempSettings.allCorrect}
        category="allCorrect"
        onSettingChange={handleSettingChange}
      />
      <GameScoreSetting
        title="일부만 맞춘 경우"
        fields={[
          { key: 'storyteller', label: '이야기꾼' },
          { key: 'correct', label: '맞춘 플레이어' },
        ]}
        values={tempSettings.someCorrect}
        category="someCorrect"
        onSettingChange={handleSettingChange}
      />
      <GameScoreSetting
        title="다른 플레이어 카드 맞춘 경우"
        fields={[
          { key: 'finder', label: '맞춘 사람' },
          { key: 'owner', label: '카드 주인' },
        ]}
        values={tempSettings.findOthers}
        category="findOthers"
        onSettingChange={handleSettingChange}
      />
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => setTempSettings(scoreSettings)}>
          기본값으로 초기화
        </Button>
        <Button className="flex-1" onClick={handleConfirm}>
          {variant === 'dialog' ? '저장' : '다음'}
        </Button>
      </div>
      {variant === 'dialog' && (
        <Button
          variant="outline"
          className="w-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border-red-200"
          onClick={() => resetGame()}
        >
          게임 초기화 하기
        </Button>
      )}
    </div>
  )

  /**
   * 재설정 모달 버전
   */
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
          <CardContent>{content}</CardContent>
        </DialogContent>
      </Dialog>
    )
  }

  /**
   * 초기 페이지 버전
   */
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">게임 설정</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
