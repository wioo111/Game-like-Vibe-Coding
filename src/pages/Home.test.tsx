import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Home from '@/pages/Home'
import { useSceneStore } from '@/store/useSceneStore'

describe('Home', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useSceneStore.setState({
      step: 1,
      apiKey: '',
      typedText: '',
      systemResponse: '',
      isTypingComplete: false,
      isSubmitted: false,
      isLoading: false,
    })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders the tutorial flow and handles API key confirmation', () => {
    render(<Home />)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(
      screen.getByText('欢迎来到新手村。先别急着写代码。你现在要做的不是学习语法，而是先拿到一把能和 AI 连接的钥匙。'),
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: '我知道了，开始拿钥匙' })).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '我知道了，开始拿钥匙' }))
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(
      screen.getByText('很好。我们用 DeepSeek 作为第一把武器，因为它更容易起步。接下来只做三件事：登录、充值、创建 API Key。'),
    ).toBeInTheDocument()
    expect(screen.getByText('不会充值')).toBeInTheDocument()
    expect(screen.getByText('不会创建 Key')).toBeInTheDocument()
    expect(screen.getByText('2. 获取钥匙')).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: '打开 DeepSeek 控制台' }),
    ).toHaveAttribute('href', 'https://platform.deepseek.com/api_keys')

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '我已经拿到了 Key' }))
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(
      screen.getByText('拿到钥匙后，把它粘贴回这里。系统会先帮你完成第一轮链路验证。'),
    ).toBeInTheDocument()

    act(() => {
      fireEvent.change(screen.getByLabelText('API Key'), {
        target: { value: 'sk-test-value' },
      })
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '开始验证' }))
    })

    expect(screen.getByText('正在建立加密链路...')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('验证成功。下一关：学会发出第一句话。')).toBeInTheDocument()
    expect(screen.getByText('NEURAL LINK ESTABLISHED')).toBeInTheDocument()
    expect(screen.getByText('玩法 01')).toBeInTheDocument()
  })

  it('supports going back to the previous step', () => {
    render(<Home />)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '我知道了，开始拿钥匙' }))
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.getByRole('button', { name: '上一步' })).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '上一步' }))
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(
      screen.getByText('欢迎来到新手村。先别急着写代码。你现在要做的不是学习语法，而是先拿到一把能和 AI 连接的钥匙。'),
    ).toBeInTheDocument()
  })
})
