import { Input } from '../ui/input'

interface ScoreSettingSectionProps {
  title: string
  settings: { [key: string]: number }
  category: string
  labels: { [key: string]: string }
  onSettingChange: (category: string, field: string, value: string) => void
}

export function ScoreSettingSection({
  title,
  settings,
  category,
  labels,
  onSettingChange,
}: ScoreSettingSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(settings).map(([field, value]) => (
          <div key={field} className="space-y-1">
            <label className="text-sm text-muted-foreground">{labels[field]}</label>
            <Input
              type="number"
              value={value}
              onChange={e => onSettingChange(category, field, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
