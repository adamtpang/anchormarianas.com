import { NextResponse } from 'next/server'
import { getStudioApps } from '@/lib/github'

export const revalidate = 21600 // 6 hours

export async function GET() {
  try {
    console.log('🔍 Fetching studio apps...')
    const apps = await getStudioApps()
    console.log('✅ Got apps:', apps.length)
    console.log('📦 Apps:', JSON.stringify(apps, null, 2))
    return NextResponse.json(apps)
  } catch (error) {
    console.error("❌ Failed to fetch apps:", error)
    return NextResponse.json([], { status: 500 })
  }
}
