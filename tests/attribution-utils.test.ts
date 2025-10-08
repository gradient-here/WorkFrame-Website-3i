import { describe, it, expect } from 'vitest'
import { serializeAttribution, parseAttribution, isAttributionExpired, validateProductSlug, validateUserId } from '@/lib/attribution-utils'

describe('attribution-utils', () => {
  it('serialize and parse roundtrip', () => {
    const data = { p: 'quickread', u: 'user123', rid: 'abc123', ts: new Date().toISOString() }
    const s = serializeAttribution(data as any)
    const parsed = parseAttribution(s)
    expect(parsed).not.toBeNull()
    expect(parsed?.p).toBe(data.p)
    expect(parsed?.rid).toBe(data.rid)
  })

  it('isAttributionExpired returns false for recent timestamp', () => {
    const data = { p: 'quickread', u: 'user123', rid: 'abc123', ts: new Date().toISOString() }
    expect(isAttributionExpired(data as any)).toBe(false)
  })

  it('validateProductSlug accepts valid slug', () => {
    expect(validateProductSlug('quickread')).toBe(true)
    expect(validateProductSlug('chat-on-a-page')).toBe(true)
  })

  it('validateProductSlug rejects invalid slug', () => {
    expect(validateProductSlug('Invalid*Slug')).toBe(false)
    expect(validateProductSlug('')).toBe(false)
  })

  it('validateUserId accepts valid ids', () => {
    expect(validateUserId('user_123-ABC')).toBe(true)
  })

  it('validateUserId rejects invalid ids', () => {
    expect(validateUserId('user id with spaces')).toBe(false)
    expect(validateUserId('')).toBe(false)
  })
})
