import { addSseClient, getPublicStatus, removeSseClient, startBackgroundChecker } from '@/lib/fcai-status'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  startBackgroundChecker()
  const encoder = new TextEncoder()
  let controllerRef: ReadableStreamDefaultController<Uint8Array>
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller
      addSseClient(controller)
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(getPublicStatus())}\n\n`))
    },
    cancel() {
      removeSseClient(controllerRef!)
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
