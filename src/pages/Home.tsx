import { useEffect } from 'react'
import CharacterSilhouette from '@/components/CharacterSilhouette'
import DialogPanel from '@/components/DialogPanel'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useSceneStore } from '@/store/useSceneStore'

const getTextForStep = (step: 1 | 2 | 3 | 4) => {
  switch(step) {
    case 1: return '欢迎来到新手村。先别急着写代码。你现在要做的不是学习语法，而是先拿到一把能和 AI 连接的钥匙。'
    case 2: return '很好。我们用 DeepSeek 作为第一把武器，因为它更容易起步。接下来只做三件事：登录、充值、创建 API Key。'
    case 3: return '拿到钥匙后，把它粘贴回这里。系统会先帮你完成第一轮链路验证。'
    case 4: return '第一关完成。你已经有了武器。下一关不是学参数，而是学会和 AI 说第一句话。'
    default: return ''
  }
}

export default function Home() {
  const step = useSceneStore((state) => state.step)
  const advanceStep = useSceneStore((state) => state.advanceStep)
  const retreatStep = useSceneStore((state) => state.retreatStep)
  const apiKey = useSceneStore((state) => state.apiKey)
  const isLoading = useSceneStore((state) => state.isLoading)
  const isSubmitted = useSceneStore((state) => state.isSubmitted)
  const systemResponse = useSceneStore((state) => state.systemResponse)
  const setApiKey = useSceneStore((state) => state.setApiKey)
  const submit = useSceneStore((state) => state.submit)
  const handleSystemResponse = useSceneStore((state) => state.handleSystemResponse)
  const { typedText, isTypingComplete } = useTypewriter(getTextForStep(step))

  useEffect(() => {
    if (!isLoading) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      handleSystemResponse('验证成功。下一关：学会发出第一句话。')
      advanceStep()
    }, 900)

    return () => window.clearTimeout(timeoutId)
  }, [handleSystemResponse, isLoading, advanceStep])

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_42%,rgba(34,211,238,0.1),transparent_18%),radial-gradient(circle_at_72%_18%,rgba(34,211,238,0.14),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,#020202_0%,#000_42%,#020202_100%)]" />
      <div className="cyber-grid absolute inset-0 opacity-25" />
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="absolute inset-x-0 top-10 z-10 flex items-center justify-between px-5 text-[10px] uppercase tracking-[0.42em] text-zinc-500 sm:px-10">
        <span>黑室 / 接口</span>
        <span>视觉链路</span>
      </div>

      <section className="relative min-h-screen px-6 pb-16 pt-24 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute left-[9%] top-[20%] hidden h-[24rem] w-[24rem] rounded-full bg-cyan-300/7 blur-[110px] lg:block" />

        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 lg:grid-cols-[minmax(260px,0.75fr)_minmax(460px,1fr)]">
          <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[560px]">
            <CharacterSilhouette />
          </div>

          <div className="relative flex items-center justify-start">
            <DialogPanel
              step={step}
              advanceStep={advanceStep}
              retreatStep={retreatStep}
              typedText={typedText}
              isTypingComplete={isTypingComplete}
              apiKey={apiKey}
              isLoading={isLoading}
              isSubmitted={isSubmitted}
              systemResponse={systemResponse}
              onApiKeyChange={setApiKey}
              onSubmit={submit}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
