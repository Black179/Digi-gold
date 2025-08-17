import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { validateSession } from '@/lib/auth'

// Get user's price alerts
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

    const alerts = await prisma.priceAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Get alerts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create a new price alert
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

    const { goldType, targetPrice, condition } = await request.json()

    if (!goldType || !targetPrice || !condition) {
      return NextResponse.json(
        { error: 'GoldType, targetPrice, and condition are required' },
        { status: 400 }
      )
    }

    const alert = await prisma.priceAlert.create({
      data: {
        userId,
        goldType,
        targetPrice,
        condition,
        isActive: true,
      },
    })

    return NextResponse.json(alert)
  } catch (error) {
    console.error('Create alert error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
