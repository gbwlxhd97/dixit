import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { IFunnelProps } from "@/interfaces/funnel"
import { ONBOARDING_STEPS } from "@/constants"


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
          className="text-right text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          스킵하기
        </div>
      </CardContent>
    </Card>
  )
}