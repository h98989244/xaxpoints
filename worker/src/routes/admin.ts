import { Hono } from 'hono'
import { authMiddleware, adminMiddleware } from '../middleware/auth'

type Env = {
  DB: D1Database
  JWT_SECRET: string
}

type Variables = {
  user: {
    id: string
    email: string
    role: string
    display_name: string
  }
}

const admin = new Hono<{ Bindings: Env; Variables: Variables }>()

// All admin routes require auth + admin
admin.use('*', authMiddleware, adminMiddleware)

// GET /api/admin/stats - Dashboard statistics
admin.get('/stats', async (c) => {
  try {
    const totalOrders = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM orders'
    ).first()

    const pendingOrders = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM orders WHERE payment_status = 'pending'"
    ).first()

    const totalRevenue = await c.env.DB.prepare(
      "SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE payment_status = 'paid'"
    ).first()

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayISO = todayStart.toISOString()

    const todayOrders = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM orders WHERE created_at >= ?'
    ).bind(todayISO).first()

    return c.json({
      stats: {
        total_orders: (totalOrders as any)?.count || 0,
        pending_orders: (pendingOrders as any)?.count || 0,
        total_revenue: (totalRevenue as any)?.total || 0,
        today_orders: (todayOrders as any)?.count || 0,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return c.json({ error: '取得統計資料失敗' }, 500)
  }
})

export default admin
