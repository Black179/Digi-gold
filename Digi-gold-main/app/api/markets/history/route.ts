import { NextRequest, NextResponse } from 'next/server'
import { getGoldPriceHistory } from '@/lib/gold-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const goldType = searchParams.get('goldType') || '24K Gold'
    const hours = parseInt(searchParams.get('hours') || '24')

    const priceHistory = await getGoldPriceHistory(goldType, hours)

    return NextResponse.json({
      goldType,
      hours,
      data: priceHistory,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Get price history error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
