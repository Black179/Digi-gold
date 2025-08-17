import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { fetchRealTimeGoldPrices, getGoldPriceHistory } from '@/lib/gold-api'

// Get current market data
export async function GET() {
  try {
    // Fetch real-time gold prices
    const realTimePrices = await fetchRealTimeGoldPrices()
    
    // Store real-time data in database for history
    for (const price of realTimePrices) {
      await prisma.marketData.create({
        data: {
          goldType: price.goldType,
          price: price.price,
          change: price.changePercent,
          volume: price.volume,
        },
      })
    }

    return NextResponse.json(realTimePrices)
  } catch (error) {
    console.error('Get market data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update market data (for demo purposes)
export async function POST(request: NextRequest) {
  try {
    const { goldType, price, change, volume } = await request.json()

    if (!goldType || !price) {
      return NextResponse.json(
        { error: 'GoldType and price are required' },
        { status: 400 }
      )
    }

    const marketData = await prisma.marketData.create({
      data: {
        goldType,
        price,
        change: change || 0,
        volume: volume || 0,
      },
    })

    return NextResponse.json(marketData)
  } catch (error) {
    console.error('Update market data error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
