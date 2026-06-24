import { afterEach, describe, expect, it } from 'vitest'
import { GET } from './route'
import { __resetFcaiStatusForTests } from '@/lib/fcai-status'

describe('GET /api/fcai-status/stream', () => {
  afterEach(() => {
    __resetFcaiStatusForTests()
  })

  it('returns an SSE response with initial payload', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const reader = res.body?.getReader()
    expect(reader).toBeDefined()
    const { value } = await reader!.read()
    const chunk = new TextDecoder().decode(value)
    expect(chunk).toContain('data:')
    expect(chunk).toContain('"online"')
    reader?.cancel()
  })
})
