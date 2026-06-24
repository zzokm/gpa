import { describe, expect, it } from 'vitest'
import {
  courseCountBucket,
  importErrorKeyToParam,
  ratioPercentBucket,
  roundGpa,
  textLengthBucket,
} from './buckets'

describe('analytics buckets', () => {
  it('buckets course counts', () => {
    expect(courseCountBucket(0)).toBe('0')
    expect(courseCountBucket(3)).toBe('1-5')
    expect(courseCountBucket(20)).toBe('16-30')
    expect(courseCountBucket(40)).toBe('31+')
  })

  it('rounds gpa to two decimals', () => {
    expect(roundGpa(3.456)).toBe(3.46)
    expect(roundGpa(2)).toBe(2)
  })

  it('buckets text length', () => {
    expect(textLengthBucket(500)).toBe('<1k')
    expect(textLengthBucket(5000)).toBe('1k-10k')
    expect(textLengthBucket(15000)).toBe('10k+')
  })

  it('buckets grade ratios', () => {
    expect(ratioPercentBucket(0)).toBe('0')
    expect(ratioPercentBucket(0.4)).toBe('26-50')
    expect(ratioPercentBucket(1)).toBe('76-100')
  })

  it('maps import error keys', () => {
    expect(importErrorKeyToParam('import.invalidHtml')).toBe('invalidHtml')
  })
})

describe('isAnalyticsEnabled', () => {
  it('is false without measurement id', async () => {
    const prev = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    const { isAnalyticsEnabled } = await import('./index')
    expect(isAnalyticsEnabled()).toBe(false)
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = prev
  })
})
