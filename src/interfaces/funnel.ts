export interface IFunnelProps {
  onNext: () => void
}
export type Step = 'onBoarding' | 'playerSetup' | 'gameSetup' | 'gameStart' | 'gameResult'
