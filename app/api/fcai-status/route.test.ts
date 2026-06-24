import { afterEach, describe, expect, it } from 'vitest'
import { GET } from './route'
import { __resetFcaiStatusForTests, __setCachedForTests } from '@/lib/fcai-status'

describe('GET /api/fcai-status', () => {
  afterEach(() => {
    __resetFcaiStatusForTests()
  })

  it('returns null online before the first background check', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ online: null })
  })

  it('returns boolean online after a check is recorded', async () => {
    __setCachedForTests({ online: true, lastCheck: Date.now() })
    const res = await GET()
    const body = await res.json()
    expect(body).toEqual({ online: true })
  })
})
