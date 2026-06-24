import { NextResponse } from 'next/server'
import { getCached, startBackgroundChecker } from '@/lib/fcai-status'

export async function GET() {
  startBackgroundChecker()
  const { online } = getCached()
  return NextResponse.json({ online })
}
