export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { startBackgroundChecker } = await import('./lib/fcai-status')
    startBackgroundChecker()
  } catch {
    // ignore
  }
}
