/**
 * Background FCAI website status checker.
 * Runs on the server; clients read cached status and subscribe via SSE for updates.
 */

const FCAI_URLS = [
  'http://newecom.fci.cu.edu.eg/',
  'http://193.227.14.58/',
]

const TIMEOUT_MS = 4.5 * 60 * 1000
const INTERVAL_OFFLINE_MS = 5 * 60 * 1000
const INTERVAL_ONLINE_MS = 10 * 60 * 1000

interface CachedResult {
  online: boolean
  lastCheck: number
}

let cached: CachedResult = { online: false, lastCheck: 0 }
const sseClients = new Set<ReadableStreamDefaultController<Uint8Array>>()
let intervalId: ReturnType<typeof setInterval> | null = null
let checkInProgress = false

async function checkUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const res = await fetch(url, {
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
    let online = false
    for (const url of FCAI_URLS) {
      if (await checkUrl(url)) {
        online = true
        break
      }
    }

    const changed = cached.online !== online
    cached = { online, lastCheck: now }
    if (changed) pushToClients()
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
