import { afterEach, describe, expect, it } from 'vitest'
import { GET } from './route'
import { __resetFcaiStatusForTests } from '@/lib/fcai-status'

describe('GET /api/fcai-status', () => {
  afterEach(() => {
    __resetFcaiStatusForTests()
  })

  it('returns online boolean JSON', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ online: expect.any(Boolean) })
  })
})
