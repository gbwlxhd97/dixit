import React, { useState } from 'react'

type Step = 'onBoarding' | 'playerSetup' | 'gameSetup' | 'gameStart' | 'gameResult'

interface FunnelStepProps {
  name: Step
  children: React.ReactNode
}

export const useFunnel = (steps: Step[]) => {
  const [step, setStep] = useState<Step>(steps[0])

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  }

  Funnel.step = ({ name, children }: FunnelStepProps) => {
    if (name !== step) return null
    return <>{children}</>
  }

  return [step, setStep, Funnel] as const
}
