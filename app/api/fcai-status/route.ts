import { NextResponse } from 'next/server'
import { getPublicStatus, startBackgroundChecker } from '@/lib/fcai-status'

export async function GET() {
  startBackgroundChecker()
  return NextResponse.json(getPublicStatus())
}
