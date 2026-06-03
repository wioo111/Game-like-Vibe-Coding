export default function CharacterSilhouette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[56vh] w-[28vw] min-w-[240px] max-w-[360px] opacity-90"
    >
      <div className="absolute left-[8%] top-[12%] h-[68%] w-[62%] rounded-full border border-cyan-300/8 blur-[2px]" />
      <div className="absolute left-[26%] top-[8%] h-[16%] w-[24%] rounded-full border border-cyan-300/26 bg-cyan-300/[0.04] shadow-[0_0_32px_rgba(34,211,238,0.08)]" />
      <div className="absolute left-[21%] top-[18%] h-[18%] w-[34%] rounded-[48%_52%_42%_58%] border border-cyan-300/22 bg-gradient-to-b from-cyan-200/[0.06] to-transparent" />
      <div className="absolute left-[14%] top-[31%] h-[42%] w-[52%] rounded-[44%_56%_18%_18%] border border-cyan-300/20 bg-gradient-to-b from-cyan-300/[0.04] via-transparent to-transparent" />
      <div className="absolute left-[4%] top-[41%] h-[24%] w-[18%] -rotate-[14deg] rounded-[60%_40%_20%_20%] border border-cyan-300/12" />
      <div className="absolute right-[28%] top-[40%] h-[24%] w-[18%] rotate-[16deg] rounded-[40%_60%_20%_20%] border border-cyan-300/12" />
      <div className="absolute left-[30%] top-[24%] h-[42%] w-px bg-cyan-300/26 shadow-[0_0_12px_rgba(103,232,249,0.4)]" />
      <div className="absolute inset-x-[18%] bottom-[10%] h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
    </div>
  )
}
