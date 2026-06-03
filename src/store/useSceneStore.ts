import { create } from 'zustand'

type SceneState = {
  step: 1 | 2 | 3 | 4
  apiKey: string
  typedText: string
  systemResponse: string
  isTypingComplete: boolean
  isSubmitted: boolean
  isLoading: boolean
}

type SceneActions = {
  advanceStep: () => void
  retreatStep: () => void
  setApiKey: (value: string) => void
  advanceTyping: (value: string) => void
  finishTyping: () => void
  submit: () => void
  handleSystemResponse: (response: string) => void
  resetTyping: () => void
}

const initialState: SceneState = {
  step: 1,
  apiKey: '',
  typedText: '',
  systemResponse: '',
  isTypingComplete: false,
  isSubmitted: false,
  isLoading: false,
}

export const useSceneStore = create<SceneState & SceneActions>((set, get) => ({
  ...initialState,
  advanceStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) as 1 | 2 | 3 | 4 })),
  retreatStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) as 1 | 2 | 3 | 4 })),
  setApiKey: (value) =>
    set({
      apiKey: value,
      isSubmitted: false,
      isLoading: false,
      systemResponse: value.trim() ? '' : get().systemResponse,
    }),
  advanceTyping: (value) => set({ typedText: value }),
  finishTyping: () => set({ isTypingComplete: true }),
  submit: () => {
    const apiKey = get().apiKey.trim()

    if (!apiKey) {
      set({
        isSubmitted: false,
        isLoading: false,
        systemResponse: '先把 API Key 粘贴进来。',
      })
      return
    }

    set({
      isSubmitted: true,
      isLoading: true,
      systemResponse: '正在建立加密链路...',
    })
  },
  handleSystemResponse: (response) =>
    set({
      systemResponse: response,
      isLoading: false,
      isSubmitted: true,
    }),
  resetTyping: () =>
    set({
      typedText: '',
      isTypingComplete: false,
    }),
}))
