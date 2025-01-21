import { Input } from '@/components/ui/input'

interface ScoreSetting {
  [key: string]: number
}

interface GameScoreProps {
  title: string
  fields: {
    key: string
    label: string
  }[]
  values: ScoreSetting
  category: string
  // TODO 타입 정의
  onSettingChange: (category: any, field: string, value: string) => void
}

export function GameScoreSetting({
  title,
  fields,
  values,
  category,
  onSettingChange,
}: GameScoreProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label }) => (
          <div key={key} className="space-y-1">
            <label className="text-sm text-muted-foreground">{label}</label>
            <Input
              type="number"
              value={values[key]}
              onChange={e => onSettingChange(category, key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
