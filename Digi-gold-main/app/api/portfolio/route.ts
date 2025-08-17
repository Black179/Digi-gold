import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const userId = await validateSession(token)

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's gold holdings
    const holdings = await prisma.goldHolding.findMany({
      where: { userId },
    })

    // Get recent trades for portfolio value calculation
    const recentTrades = await prisma.trade.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Get current market prices
    const marketData = await prisma.marketData.findMany({
      orderBy: { timestamp: 'desc' },
      distinct: ['goldType'],
    })

    // Calculate portfolio value
    let totalValue = 0
    let totalInvestment = 0

    for (const holding of holdings) {
      const marketPrice = marketData.find(m => m.goldType === holding.goldType)?.price || 0
      const currentValue = holding.amount * marketPrice
      const investmentValue = holding.amount * holding.avgPrice
      
      totalValue += currentValue
      totalInvestment += investmentValue
    }

    const profitLoss = totalValue - totalInvestment
    const profitLossPercentage = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0

    return NextResponse.json({
      holdings,
      totalValue,
      totalInvestment,
      profitLoss,
      profitLossPercentage,
      recentTrades,
      marketData,
    })
  } catch (error) {
    console.error('Get portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
