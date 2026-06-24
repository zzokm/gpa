import { render, screen, waitFor } from '@testing-library/react'
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
    MockEventSource.instances = []
    vi.unstubAllGlobals()
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
      expect(screen.getByText(/fcai website/i)).toBeInTheDocument()
    })
  })
})
