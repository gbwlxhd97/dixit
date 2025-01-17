import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { IFunnelProps } from "@/interfaces/funnel"

interface OnboardingStep {
  title: string
  description: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "딕싯 점수판에 오신 것을 환영합니다! 👋",
    description: "게임을 더 재미있게 즐기실 수 있도록 도와드리겠습니다."
  },
  {
    title: "점수 기록의 편리함",
    description: "매 라운드마다 플레이어들의 점수를 쉽게 기록하고 확인할 수 있습니다."
  },
  {
    title: "4인 플레이어 최적화",
    description: "4명의 플레이어를 위한 최적의 게임 환경을 제공합니다."
  },
  {
    title: "유연한 승리 조건",
    description: "기본 승리 점수는 30점이지만, 원하는 대로 변경할 수 있습니다."
  },
  {
    title: "모바일 친화적",
    description: "언제 어디서나 휴대폰으로 편리하게 이용하실 수 있습니다."
  }
]

export function OnBoarding({ onNext }: IFunnelProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const handleNext = () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      onNext()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const currentStepData = ONBOARDING_STEPS[currentStep]

  return (
    <Card className="w-full max-w-md mx-auto relative">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {currentStepData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">
          {currentStepData.description}
        </p>
        <div className="flex justify-center gap-2">
          <div className="flex gap-1">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleNext}
          
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? "시작하기" : "다음"}
        </Button>
        
        {/* 스킵 버튼 추가 */}
        <div
          onClick={onNext}
          className="absolute bottom-2 right-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          스킵하기
        </div>
      </CardContent>
    </Card>
  )
}