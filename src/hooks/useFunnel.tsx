import React from 'react'
import { useGameStore } from '@/stores/gameStore'
import { Step } from '@/interfaces/funnel'

interface FunnelStepProps {
  name: Step
  children: React.ReactNode
}

export const useFunnel = () => {
  const { step, setStep } = useGameStore()

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  }

  Funnel.step = ({ name, children }: FunnelStepProps) => {
    if (name !== step) return null
    return <>{children}</>
  }

  return [step, setStep, Funnel] as const
}
