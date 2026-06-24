import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FCAIStatusIndicator from './FCAIStatusIndicator'
import { LocaleProvider } from '../i18n/LocaleContext'

class MockEventSource {
  static instances: MockEventSource[] = []
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: (() => void) | null = null
  url: string

  constructor(url: string) {
    this.url = url
    MockEventSource.instances.push(this)
  }

  close() {
    // no-op
  }
}

describe('FCAIStatusIndicator', () => {
  afterEach(() => {
    cleanup()
    MockEventSource.instances = []
    vi.unstubAllGlobals()
  })

  it('shows pending state when API returns null', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ online: null }),
      })
    )
    vi.stubGlobal('EventSource', MockEventSource)

    const { container } = render(
      <LocaleProvider>
        <FCAIStatusIndicator />
      </LocaleProvider>
    )

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
    })

    expect(container.querySelector('.fcai-status-unknown')).toBeInTheDocument()
    expect(container.querySelector('.fcai-status-offline')).not.toBeInTheDocument()
  })

  it('shows online state after fetch resolves', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ online: true }),
      })
    )
    vi.stubGlobal('EventSource', MockEventSource)

    render(
      <LocaleProvider>
        <FCAIStatusIndicator />
      </LocaleProvider>
    )

    await waitFor(() => {
      expect(document.querySelector('.fcai-status-online')).toBeInTheDocument()
    })

    const link = screen.getByRole('link', { name: /online/i })
    expect(link).toHaveAttribute('href', 'http://193.227.14.58/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
