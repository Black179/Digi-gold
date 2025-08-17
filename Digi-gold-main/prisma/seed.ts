import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
      phone: '+1 (555) 123-4567',
    },
  })

  // Create sample market data
  const marketData = [
    { goldType: '24K Gold', price: 2180.50, change: 2.45, volume: 1245 },
    { goldType: '22K Gold', price: 2045.75, change: 1.87, volume: 892 },
    { goldType: '18K Gold', price: 1635.25, change: -0.32, volume: 567 },
    { goldType: '14K Gold', price: 1272.80, change: 0.95, volume: 423 },
  ]

  for (const data of marketData) {
    await prisma.marketData.create({
      data: {
        goldType: data.goldType,
        price: data.price,
        change: data.change,
        volume: data.volume,
      },
    })
  }

  // Create sample trades
  const trades = [
    {
      userId: user.id,
      type: 'BUY',
      goldType: '24K Gold',
      amount: 2.5,
      price: 2150.00,
      total: 5375.00,
      status: 'COMPLETED',
    },
    {
      userId: user.id,
      type: 'SELL',
      goldType: '24K Gold',
      amount: 1.0,
      price: 2180.00,
      total: 2180.00,
      status: 'COMPLETED',
    },
    {
      userId: user.id,
      type: 'BUY',
      goldType: '22K Gold',
      amount: 5.0,
      price: 2120.00,
      total: 10600.00,
      status: 'COMPLETED',
    },
  ]

  for (const trade of trades) {
    await prisma.trade.create({
      data: trade,
    })
  }

  // Create sample gold holdings
  const holdings = [
    {
      userId: user.id,
      goldType: '24K Gold',
      amount: 1.5,
      avgPrice: 2150.00,
    },
    {
      userId: user.id,
      goldType: '22K Gold',
      amount: 5.0,
      avgPrice: 2120.00,
    },
  ]

  for (const holding of holdings) {
    await prisma.goldHolding.upsert({
      where: {
        userId_goldType: {
          userId: user.id,
          goldType: holding.goldType,
        },
      },
      update: holding,
      create: holding,
    })
  }

  console.log('Database seeded successfully!')
  console.log('Sample user created: john.doe@example.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
