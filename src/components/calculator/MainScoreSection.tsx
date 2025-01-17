import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface MainScoreSectionProps {
  mainCase: 'allCorrect' | 'someCorrect' | null
  onMainCaseSelect: (value: string) => void
}

export function MainScoreSection({ mainCase, onMainCaseSelect }: MainScoreSectionProps) {
  return (
    <div className="space-y-2">
      <Label>메인 점수</Label>
      <RadioGroup value={mainCase || ''} onValueChange={onMainCaseSelect}>
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
  )
}
