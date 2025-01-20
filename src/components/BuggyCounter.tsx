import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function BuggyCounter() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (counter === 5) {
      throw new Error('의도적으로 발생시킨 에러입니다!')
    }
  }, [counter])

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="mb-4 font-medium">에러 테스트: {counter}</p>
      <Button onClick={() => setCounter(prev => prev + 1)}>
        카운터 증가 {counter === 4 && '(다음은 에러!)'}
      </Button>
    </div>
  )
}
