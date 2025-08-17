import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

// Get user's trades
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

    const trades = await prisma.trade.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(trades)
  } catch (error) {
    console.error('Get trades error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create a new trade
export async function POST(request: NextRequest) {
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

    const { type, goldType, amount, price } = await request.json()

    // Validate input
    if (!type || !goldType || !amount || !price) {
      return NextResponse.json(
        { error: 'Type, goldType, amount, and price are required' },
        { status: 400 }
      )
    }

    const total = amount * price

    // Create trade
    const trade = await prisma.trade.create({
      data: {
        userId,
        type,
        goldType,
        amount,
        price,
        total,
        status: 'COMPLETED', // For demo purposes, all trades are completed
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Update or create gold holding
    const existingHolding = await prisma.goldHolding.findUnique({
      where: {
        userId_goldType: {
          userId,
          goldType,
        },
      },
    })

    if (existingHolding) {
      if (type === 'BUY') {
        const newAmount = existingHolding.amount + amount
        const newAvgPrice = ((existingHolding.amount * existingHolding.avgPrice) + total) / newAmount
        
        await prisma.goldHolding.update({
          where: { id: existingHolding.id },
          data: {
            amount: newAmount,
            avgPrice: newAvgPrice,
          },
        })
      } else if (type === 'SELL') {
        const newAmount = existingHolding.amount - amount
        if (newAmount >= 0) {
          await prisma.goldHolding.update({
            where: { id: existingHolding.id },
            data: { amount: newAmount },
          })
        }
      }
    } else if (type === 'BUY') {
      await prisma.goldHolding.create({
        data: {
          userId,
          goldType,
          amount,
          avgPrice: price,
        },
      })
    }

    return NextResponse.json(trade)
  } catch (error) {
    console.error('Create trade error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
