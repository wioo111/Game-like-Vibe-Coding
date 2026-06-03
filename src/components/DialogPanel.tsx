type DialogPanelProps = {
  step: 1 | 2 | 3 | 4
  advanceStep: () => void
  retreatStep: () => void
  typedText: string
  isTypingComplete: boolean
  apiKey: string
  isLoading: boolean
  isSubmitted: boolean
  systemResponse: string
  onApiKeyChange: (value: string) => void
  onSubmit: () => void
}

export default function DialogPanel({
  step,
  advanceStep,
  retreatStep,
  typedText,
  isTypingComplete,
  apiKey,
  isLoading,
  isSubmitted,
  systemResponse,
  onApiKeyChange,
  onSubmit,
}: DialogPanelProps) {
  const canSubmit = Boolean(apiKey.trim()) && !isLoading
  const stepItems = [
    { id: 1, label: '认知说明' },
    { id: 2, label: '获取钥匙' },
    { id: 3, label: '粘贴验证' },
    { id: 4, label: '第一次对话' },
  ] as const
  const statusLabel =
    step === 1
      ? '准备进入'
      : step === 2
        ? '等待拿钥匙'
        : step === 3
          ? (isSubmitted ? '链路验证中' : '等待粘贴')
          : '第一关完成'

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-5">
          <div className="space-y-3 text-sm leading-7 text-zinc-300">
            <p>这一关只有一个目标：拿到能调用 AI 的 API Key。</p>
            <p>你不用先学代码，也不用先懂配置。先拿到钥匙，后面的门才会打开。</p>
          </div>
          <button
            type="button"
            onClick={advanceStep}
            className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-300/[0.08] px-6 font-['Noto_Sans_SC'] text-sm tracking-[0.08em] text-cyan-100 transition duration-300 hover:bg-cyan-300/[0.14] hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          >
            我知道了，开始拿钥匙
          </button>
        </div>
      )
    }

    if (step === 2) {
      return (
        <div className="space-y-5">
          <div className="rounded-[22px] border border-white/8 bg-white/[0.025] px-5 py-4">
            <ol className="space-y-3 font-['Noto_Sans_SC'] text-sm leading-7 text-zinc-200">
              <li>1. 登录 DeepSeek 开放平台，进入控制台。</li>
              <li>2. 充值少量余额，够完成第一次连接和几次对话即可。</li>
              <li>3. 找到 `API Keys` 页面，创建新的 Key，并给它备注成“新手教程专用”之类的名字，避免以后和别的 Key 混淆。</li>
              <li>4. 复制生成后的 Key。注意：很多平台在你关闭弹窗后就不会再次完整展示这串字符，所以一定要先复制或保存，再继续下一步。</li>
            </ol>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/7 bg-black/18 px-4 py-3">
              <p className="font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
                不会充值
              </p>
              <p className="mt-2 font-['Noto_Sans_SC'] text-sm leading-7 text-zinc-400">
                不要一上来充很多。先用最小可接受金额，目的是跑通第一次闭环。
              </p>
            </div>

            <div className="rounded-[20px] border border-white/7 bg-black/18 px-4 py-3">
              <p className="font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
                不会创建 Key
              </p>
              <p className="mt-2 font-['Noto_Sans_SC'] text-sm leading-7 text-zinc-400">
                进入 `API Keys` 页面后点击创建，先写备注，再复制那串字符。关掉创建结果弹窗后，通常就不能再次完整复制了。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://platform.deepseek.com/api_keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-300/[0.08] px-6 font-['Noto_Sans_SC'] text-sm tracking-[0.08em] text-cyan-100 transition duration-300 hover:bg-cyan-300/[0.14] hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              打开 DeepSeek 控制台
            </a>
            <button
              type="button"
              onClick={advanceStep}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 font-['Noto_Sans_SC'] text-sm tracking-[0.08em] text-zinc-100 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05] hover:text-cyan-100"
            >
              我已经拿到了 Key
            </button>
          </div>
        </div>
      )
    }

    if (step === 3) {
      return (
        <div className="space-y-5">
          <p className="text-sm leading-7 text-zinc-300">
            把刚刚复制的 API Key 粘贴回来。它一般是一段很长的字符，只在你自己的工具里使用。
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="api-key-input">
              API Key
            </label>
            <input
              id="api-key-input"
              type="text"
              value={apiKey}
              onChange={(event) => onApiKeyChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canSubmit) {
                  onSubmit()
                }
              }}
              placeholder="在这里粘贴你的 API Key"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 font-['Share_Tech_Mono'] text-sm tracking-[0.08em] text-cyan-50 outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/60 focus:bg-cyan-300/[0.05] focus:shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_0_22px_rgba(34,211,238,0.08)]"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit}
              className="h-12 min-w-[144px] rounded-full border border-cyan-300/45 bg-cyan-300/[0.08] px-6 font-['Orbitron'] text-xs uppercase tracking-[0.26em] text-cyan-100 transition duration-300 hover:bg-cyan-300/[0.14] hover:shadow-[0_0_24px_rgba(34,211,238,0.18)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-zinc-500"
            >
              {isLoading ? '连接中' : '开始验证'}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-5">
        <div className="flex min-h-12 items-center gap-3 rounded-[22px] border border-cyan-300/24 bg-cyan-300/[0.05] px-5 font-['Share_Tech_Mono'] text-sm tracking-[0.14em] text-cyan-300/85">
          <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
          NEURAL LINK ESTABLISHED
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[20px] border border-white/7 bg-black/18 px-4 py-3">
            <p className="font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
              玩法 01
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">让它解释一个你看不懂的报错。</p>
          </div>
          <div className="rounded-[20px] border border-white/7 bg-black/18 px-4 py-3">
            <p className="font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
              玩法 02
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">让它先写一个简单页面，比如按钮或表单。</p>
          </div>
          <div className="rounded-[20px] border border-white/7 bg-black/18 px-4 py-3">
            <p className="font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">
              玩法 03
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">让它改你手上的现有项目，比从零开始更容易。</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-20 w-full max-w-[640px]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full border border-cyan-300/18 bg-cyan-300/[0.04]">
            <div className="absolute inset-x-[30%] top-[21%] h-[22%] rounded-full border border-cyan-200/25" />
            <div className="absolute left-[25%] top-[41%] h-[26%] w-[50%] rounded-[45%_55%_20%_20%] border border-cyan-300/20" />
          </div>
          <div>
            <p className="font-['Orbitron'] text-[11px] uppercase tracking-[0.28em] text-cyan-200/58">
              静默代理
            </p>
            <p className="mt-1 text-sm text-zinc-500">一次只做一件事。</p>
          </div>
        </div>

        <div className="rounded-full border border-white/10 px-4 py-1.5 font-['Share_Tech_Mono'] text-[10px] uppercase tracking-[0.22em] text-cyan-200/60">
          {`步骤 0${step}`}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {stepItems.map((item) => {
          const isActive = item.id === step
          const isDone = item.id < step

          return (
            <div
              key={item.id}
              className={`rounded-full px-3 py-1.5 text-xs tracking-[0.06em] transition ${
                isActive
                  ? 'bg-cyan-300/[0.08] text-cyan-100'
                  : isDone
                    ? 'bg-white/[0.05] text-zinc-200'
                    : 'text-zinc-500'
              }`}
            >
              {`${item.id}. ${item.label}`}
            </div>
          )
        })}

        {step > 1 && (
          <button
            type="button"
            onClick={retreatStep}
            className="ml-auto inline-flex h-9 items-center justify-center rounded-full border border-white/10 px-4 text-sm text-zinc-200 transition duration-300 hover:border-cyan-300/30 hover:text-cyan-100"
          >
            上一步
          </button>
        )}
      </div>

      <div className="mt-8">
        <p className="font-['Noto_Sans_SC'] text-[30px] font-semibold leading-[1.5] text-zinc-100 sm:text-[34px]">
          {typedText}
          <span
            aria-hidden="true"
            className={`ml-1 inline-block h-7 w-px bg-cyan-300 align-[-4px] ${
              isTypingComplete ? 'animate-pulse' : 'animate-cursor-blink'
            }`}
          />
        </p>
      </div>

      <div className="mt-8 border-l border-cyan-300/16 pl-5 sm:pl-6">
        {renderStepContent()}
      </div>

      <div className="mt-8 flex min-h-6 items-center justify-between gap-4 border-t border-white/6 pt-4 text-xs tracking-[0.12em] text-zinc-400">
        <span className="font-['Share_Tech_Mono'] uppercase text-cyan-200/55">
          {statusLabel}
        </span>
        <span className="font-['Noto_Sans_SC'] text-right text-zinc-400/90">
          {systemResponse}
        </span>
      </div>
    </div>
  )
}
