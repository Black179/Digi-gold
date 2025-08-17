import { prisma } from './db'
import { fetchRealTimeGoldPrices } from './gold-api'

interface PriceAlert {
  id: string
  userId: string
  goldType: string
  targetPrice: number
  condition: 'above' | 'below'
  isActive: boolean
}

interface Notification {
  userId: string
  message: string
  type: 'price_alert' | 'trade_executed' | 'market_update'
  data: any
  timestamp: Date
}

// Monitor price alerts and trigger notifications
export async function checkPriceAlerts(): Promise<void> {
  try {
    // Get all active price alerts
    const alerts = await prisma.priceAlert.findMany({
      where: { isActive: true },
      include: { user: true },
    })

    if (alerts.length === 0) return

    // Get current gold prices
    const currentPrices = await fetchRealTimeGoldPrices()

    for (const alert of alerts) {
      const currentPrice = currentPrices.find(p => p.goldType === alert.goldType)
      
      if (!currentPrice) continue

      let shouldTrigger = false
      let message = ''

      if (alert.condition === 'above' && currentPrice.price >= alert.targetPrice) {
        shouldTrigger = true
        message = `🚨 Price Alert: ${alert.goldType} is now above $${alert.targetPrice} (Current: $${currentPrice.price})`
      } else if (alert.condition === 'below' && currentPrice.price <= alert.targetPrice) {
        shouldTrigger = true
        message = `🚨 Price Alert: ${alert.goldType} is now below $${alert.targetPrice} (Current: $${currentPrice.price})`
      }

      if (shouldTrigger) {
        // Create notification
        await createNotification({
          userId: alert.userId,
          message,
          type: 'price_alert',
          data: {
            alertId: alert.id,
            goldType: alert.goldType,
            targetPrice: alert.targetPrice,
            currentPrice: currentPrice.price,
            condition: alert.condition,
          },
          timestamp: new Date(),
        })

        // Deactivate the alert after triggering
        await prisma.priceAlert.update({
          where: { id: alert.id },
          data: { isActive: false },
        })

        console.log(`Price alert triggered for user ${alert.userId}: ${message}`)
      }
    }
  } catch (error) {
    console.error('Error checking price alerts:', error)
  }
}

// Create a notification
async function createNotification(notification: Omit<Notification, 'id'>): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        userId: notification.userId,
        message: notification.message,
        type: notification.type,
        data: notification.data,
        timestamp: notification.timestamp,
        isRead: false,
      },
    })
  } catch (error) {
    console.error('Error creating notification:', error)
  }
}

// Start price monitoring (run every 30 seconds)
export function startPriceMonitoring(): () => void {
  const intervalId = setInterval(checkPriceAlerts, 30000) // 30 seconds
  
  // Return function to stop monitoring
  return () => clearInterval(intervalId)
}

// Get user notifications
export async function getUserNotifications(userId: string): Promise<any[]> {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 50, // Limit to last 50 notifications
    })
    
    return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    })
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}
