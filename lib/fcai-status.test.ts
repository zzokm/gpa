import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  __resetFcaiStatusForTests,
  addSseClient,
  checkUrlWithFetch,
  evaluateFcaiUrls,
  getCached,
  removeSseClient,
} from './fcai-status'

describe('checkUrlWithFetch', () => {
  it('returns true for ok responses', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    expect(await checkUrlWithFetch('http://example.com', fetchFn, 1000)).toBe(true)
  })

  it('returns true for redirect responses', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 302 })
    expect(await checkUrlWithFetch('http://example.com', fetchFn, 1000)).toBe(true)
  })

  it('returns false on fetch failure', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('network'))
    expect(await checkUrlWithFetch('http://example.com', fetchFn, 1000)).toBe(false)
  })
})

describe('evaluateFcaiUrls', () => {
  it('returns true when any URL succeeds', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({ ok: true, status: 200 })

    expect(await evaluateFcaiUrls(['http://a.test', 'http://b.test'], fetchFn)).toBe(true)
  })

  it('returns false when all URLs fail', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('down'))
    expect(await evaluateFcaiUrls(['http://a.test'], fetchFn)).toBe(false)
  })
})

describe('fcai status cache and SSE clients', () => {
  afterEach(() => {
    __resetFcaiStatusForTests()
  })

  it('returns cached snapshot', () => {
    expect(getCached()).toEqual({ online: false, lastCheck: 0 })
  })

  it('tracks SSE clients', () => {
    const ctrl = {
      enqueue: vi.fn(),
    } as unknown as ReadableStreamDefaultController<Uint8Array>

    addSseClient(ctrl)
    removeSseClient(ctrl)
    expect(getCached().online).toBe(false)
  })
})
