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

const products = new Hono<{ Bindings: Env; Variables: Variables }>()

// GET /api/products - List active products (public)
products.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC'
    ).all()

    return c.json({ products: results })
  } catch (error) {
    console.error('List products error:', error)
    return c.json({ error: '取得商品列表失敗' }, 500)
  }
})

// GET /api/products/:id - Get single product (public)
products.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const product = await c.env.DB.prepare(
      'SELECT * FROM products WHERE id = ? AND is_active = 1'
    ).bind(id).first()

    if (!product) {
      return c.json({ error: '找不到此商品' }, 404)
    }

    return c.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    return c.json({ error: '取得商品失敗' }, 500)
  }
})

// POST /api/products - Create product (admin only)
products.post('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const { name, denomination, price, description, image_url, sort_order } = body

    if (!name || denomination === undefined || price === undefined) {
      return c.json({ error: '請填寫商品名稱、面額和價格' }, 400)
    }

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await c.env.DB.prepare(
      `INSERT INTO products (id, name, denomination, price, description, image_url, is_active, sort_order, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`
    ).bind(
      id,
      name,
      denomination,
      price,
      description || null,
      image_url || null,
      sort_order || 0,
      now
    ).run()

    const product = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first()

    return c.json({ product }, 201)
  } catch (error) {
    console.error('Create product error:', error)
    return c.json({ error: '建立商品失敗' }, 500)
  }
})

// PUT /api/products/:id - Update product (admin only)
products.put('/:id', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    const existing = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first()
    if (!existing) {
      return c.json({ error: '找不到此商品' }, 404)
    }

    const name = body.name ?? existing.name
    const denomination = body.denomination ?? existing.denomination
    const price = body.price ?? existing.price
    const description = body.description ?? existing.description
    const image_url = body.image_url ?? existing.image_url
    const is_active = body.is_active ?? existing.is_active
    const sort_order = body.sort_order ?? existing.sort_order

    await c.env.DB.prepare(
      `UPDATE products SET name = ?, denomination = ?, price = ?, description = ?, image_url = ?, is_active = ?, sort_order = ?
       WHERE id = ?`
    ).bind(name, denomination, price, description, image_url, is_active, sort_order, id).run()

    const product = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first()

    return c.json({ product })
  } catch (error) {
    console.error('Update product error:', error)
    return c.json({ error: '更新商品失敗' }, 500)
  }
})

// DELETE /api/products/:id - Soft delete product (admin only)
products.delete('/:id', authMiddleware, adminMiddleware, async (c) => {
  try {
    const id = c.req.param('id')

    const existing = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first()
    if (!existing) {
      return c.json({ error: '找不到此商品' }, 404)
    }

    await c.env.DB.prepare('UPDATE products SET is_active = 0 WHERE id = ?').bind(id).run()

    return c.json({ message: '商品已下架' })
  } catch (error) {
    console.error('Delete product error:', error)
    return c.json({ error: '下架商品失敗' }, 500)
  }
})

export default products
