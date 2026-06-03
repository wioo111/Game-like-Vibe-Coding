import { useEffect } from 'react'
import { useSceneStore } from '@/store/useSceneStore'

const BASE_DELAY = 42

function resolveDelay(character: string) {
  if ('。！？'.includes(character)) {
    return 240
  }

  if ('，、'.includes(character)) {
    return 120
  }

  if (character === ' ') {
    return 20
  }

  return BASE_DELAY
}

export function useTypewriter(targetText: string) {
  const typedText = useSceneStore((state) => state.typedText)
  const isTypingComplete = useSceneStore((state) => state.isTypingComplete)
  const advanceTyping = useSceneStore((state) => state.advanceTyping)
  const finishTyping = useSceneStore((state) => state.finishTyping)
  const resetTyping = useSceneStore((state) => state.resetTyping)

  useEffect(() => {
    resetTyping()

    let currentIndex = 0
    let timeoutId: number | undefined

    const tick = () => {
      currentIndex += 1
      advanceTyping(targetText.slice(0, currentIndex))

      if (currentIndex >= targetText.length) {
        finishTyping()
        return
      }

      timeoutId = window.setTimeout(
        tick,
        resolveDelay(targetText[currentIndex - 1] ?? ''),
      )
    }

    timeoutId = window.setTimeout(tick, 300)

    return () => {
      window.clearTimeout(timeoutId)
      resetTyping()
    }
  }, [advanceTyping, finishTyping, resetTyping, targetText])

  return {
    typedText,
    isTypingComplete,
  }
}
