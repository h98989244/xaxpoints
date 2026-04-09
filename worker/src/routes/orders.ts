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

const orders = new Hono<{ Bindings: Env; Variables: Variables }>()

function generateOrderNumber(): string {
  const now = Date.now()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `ZH${now}${random}`
}

// POST /api/orders - Create order (requires auth)
orders.post('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { items, payment_method, buyer_name, buyer_email, buyer_phone, note } = body

    if (!items || !payment_method) {
      return c.json({ error: '請填寫訂單資訊' }, 400)
    }

    if (!['atm', 'convenience_store'].includes(payment_method)) {
      return c.json({ error: '無效的付款方式' }, 400)
    }

    // Parse items and calculate total
    let parsedItems: Array<{ product_id: string; name: string; quantity: number; price: number }>
    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items
    } catch {
      return c.json({ error: '無效的商品資料' }, 400)
    }

    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return c.json({ error: '購物車不能為空' }, 400)
    }

    let totalAmount = 0
    for (const item of parsedItems) {
      if (!item.product_id || !item.quantity || !item.price) {
        return c.json({ error: '商品資料不完整' }, 400)
      }
      totalAmount += item.quantity * item.price
    }

    const id = crypto.randomUUID()
    const orderNumber = generateOrderNumber()
    const now = new Date().toISOString()
    const itemsJson = JSON.stringify(parsedItems)

    await c.env.DB.prepare(
      `INSERT INTO orders (id, order_number, user_id, items, total_amount, payment_method, payment_status, buyer_name, buyer_email, buyer_phone, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)`
    ).bind(
      id,
      orderNumber,
      user.id,
      itemsJson,
      totalAmount,
      payment_method,
      buyer_name || user.display_name,
      buyer_email || user.email,
      buyer_phone || null,
      note || null,
      now
    ).run()

    const order = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first()

    return c.json({ order }, 201)
  } catch (error) {
    console.error('Create order error:', error)
    return c.json({ error: '建立訂單失敗' }, 500)
  }
})

// GET /api/orders - List orders (user sees own, admin sees all)
orders.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit

    let results
    let countResult

    if (user.role === 'admin') {
      const statusFilter = c.req.query('status')
      if (statusFilter) {
        results = await c.env.DB.prepare(
          'SELECT * FROM orders WHERE payment_status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
        ).bind(statusFilter, limit, offset).all()
        countResult = await c.env.DB.prepare(
          'SELECT COUNT(*) as total FROM orders WHERE payment_status = ?'
        ).bind(statusFilter).first()
      } else {
        results = await c.env.DB.prepare(
          'SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?'
        ).bind(limit, offset).all()
        countResult = await c.env.DB.prepare('SELECT COUNT(*) as total FROM orders').first()
      }
    } else {
      results = await c.env.DB.prepare(
        'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
      ).bind(user.id, limit, offset).all()
      countResult = await c.env.DB.prepare(
        'SELECT COUNT(*) as total FROM orders WHERE user_id = ?'
      ).bind(user.id).first()
    }

    // Hide card_codes for unpaid orders
    const orders = results.results.map((order: any) => {
      if (order.payment_status !== 'paid') {
        return { ...order, card_codes: null }
      }
      return order
    })

    return c.json({
      orders,
      pagination: {
        page,
        limit,
        total: (countResult as any)?.total || 0,
      },
    })
  } catch (error) {
    console.error('List orders error:', error)
    return c.json({ error: '取得訂單列表失敗' }, 500)
  }
})

// GET /api/orders/track/:orderNumber - Public order tracking
orders.get('/track/:orderNumber', async (c) => {
  try {
    const orderNumber = c.req.param('orderNumber')

    const order = await c.env.DB.prepare(
      'SELECT order_number, items, total_amount, payment_method, payment_status, created_at, paid_at FROM orders WHERE order_number = ?'
    ).bind(orderNumber).first()

    if (!order) {
      return c.json({ error: '找不到此訂單' }, 404)
    }

    return c.json({ order })
  } catch (error) {
    console.error('Track order error:', error)
    return c.json({ error: '查詢訂單失敗' }, 500)
  }
})

// GET /api/orders/:id - Get order detail
orders.get('/:id', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const id = c.req.param('id')

    const order = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first()

    if (!order) {
      return c.json({ error: '找不到此訂單' }, 404)
    }

    // Non-admin users can only see their own orders
    if (user.role !== 'admin' && order.user_id !== user.id) {
      return c.json({ error: '無權查看此訂單' }, 403)
    }

    // Hide card_codes for unpaid orders
    if (order.payment_status !== 'paid') {
      return c.json({ order: { ...order, card_codes: null } })
    }

    return c.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    return c.json({ error: '取得訂單失敗' }, 500)
  }
})

// PUT /api/orders/:id - Update order (admin only)
orders.put('/:id', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    const existing = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first()
    if (!existing) {
      return c.json({ error: '找不到此訂單' }, 404)
    }

    const payment_status = body.payment_status ?? existing.payment_status
    const card_codes = body.card_codes !== undefined ? (typeof body.card_codes === 'string' ? body.card_codes : JSON.stringify(body.card_codes)) : existing.card_codes
    const note = body.note ?? existing.note

    // If marking as paid, set paid_at
    let paid_at = existing.paid_at
    if (body.payment_status === 'paid' && existing.payment_status !== 'paid') {
      paid_at = new Date().toISOString()
    }

    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = ?, card_codes = ?, note = ?, paid_at = ? WHERE id = ?'
    ).bind(payment_status, card_codes, note, paid_at, id).run()

    const order = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first()

    return c.json({ order })
  } catch (error) {
    console.error('Update order error:', error)
    return c.json({ error: '更新訂單失敗' }, 500)
  }
})

export default orders
