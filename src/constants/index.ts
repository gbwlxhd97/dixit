interface OnboardingStep {
  title: string
  description: string
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Dixit 점수판에 오신 것을 환영합니다! 👋',
    description: '게임을 더 재미있게 즐기실 수 있도록 도와드리겠습니다.',
  },
  {
    title: '점수 기록의 편리함',
    description: '매 라운드마다 플레이어들의 점수를 쉽게 기록하고 확인할 수 있습니다.',
  },
  {
    title: '4인 플레이어 최적화',
    description: '4명의 플레이어를 위한 최적의 게임 환경을 제공합니다.',
  },
  {
    title: '유연한 승리 조건',
    description:
      '기본 승리 점수는 30점이지만, 원하는 대로 변경할 수 있습니다.\n 추가적으로 조건별 획득 점수를 조정할 수 있습니다.',
  },
  {
    title: '모바일 친화적',
    description: '언제 어디서나 휴대폰으로 편리하게 이용하실 수 있습니다.',
  },
]


export const MIN_PLAYERS_COUNT = 4