/**
 * Background FCAI website status checker.
 * Runs on the server; clients read cached status and subscribe via SSE for updates.
 */

import { FCAI_URLS } from './fcai-urls'

export { FCAI_URLS } from './fcai-urls'

const TIMEOUT_MS = 4.5 * 60 * 1000
const INTERVAL_OFFLINE_MS = 5 * 60 * 1000
const INTERVAL_ONLINE_MS = 10 * 60 * 1000

export interface CachedResult {
  online: boolean
  lastCheck: number
}

type FetchFn = typeof fetch

let cached: CachedResult = { online: false, lastCheck: 0 }
const sseClients = new Set<ReadableStreamDefaultController<Uint8Array>>()
let intervalId: ReturnType<typeof setInterval> | null = null
let checkInProgress = false

export async function checkUrlWithFetch(
  url: string,
  fetchFn: FetchFn = fetch,
  timeoutMs = TIMEOUT_MS
): Promise<boolean> {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetchFn(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(id)
    return res.ok || (res.status >= 300 && res.status < 400)
  } catch {
    return false
  }
}

/** Returns true when any URL responds successfully. */
export async function evaluateFcaiUrls(
  urls: string[],
  fetchFn: FetchFn = fetch
): Promise<boolean> {
  for (const url of urls) {
    if (await checkUrlWithFetch(url, fetchFn)) return true
  }
  return false
}

function pushToClients(): void {
  if (sseClients.size === 0) return
  const payload = `data: ${JSON.stringify({ online: cached.online })}\n\n`
  const bytes = new TextEncoder().encode(payload)
  for (const ctrl of sseClients) {
    try {
      ctrl.enqueue(bytes)
    } catch {
      sseClients.delete(ctrl)
    }
  }
}

async function runCheck(): Promise<void> {
  if (checkInProgress) return
  checkInProgress = true
  try {
    const now = Date.now()
    const wasUnchecked = cached.lastCheck === 0
    const online = await evaluateFcaiUrls(FCAI_URLS)
    const changed = cached.online !== online
    cached = { online, lastCheck: now }
    if (changed || wasUnchecked) pushToClients()
    reschedule(online)
  } finally {
    checkInProgress = false
  }
}

function reschedule(online: boolean): void {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(runCheck, online ? INTERVAL_ONLINE_MS : INTERVAL_OFFLINE_MS)
}

export function getCached(): CachedResult {
  return { ...cached }
}

/** Client-facing status: null until the first background check completes. */
export function getPublicStatus(): { online: boolean | null } {
  if (cached.lastCheck === 0) {
    return { online: null }
  }
  return { online: cached.online }
}

export function addSseClient(ctrl: ReadableStreamDefaultController<Uint8Array>): void {
  sseClients.add(ctrl)
}

export function removeSseClient(ctrl: ReadableStreamDefaultController<Uint8Array>): void {
  sseClients.delete(ctrl)
}

export function startBackgroundChecker(): void {
  if (intervalId) return
  runCheck()
}

/** Clears module state between tests. */
export function __resetFcaiStatusForTests(): void {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
  checkInProgress = false
  cached = { online: false, lastCheck: 0 }
  sseClients.clear()
}

/** Sets cached status in tests after a simulated check. */
export function __setCachedForTests(result: CachedResult): void {
  cached = { ...result }
}
