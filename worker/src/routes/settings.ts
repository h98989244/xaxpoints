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

const settings = new Hono<{ Bindings: Env; Variables: Variables }>()

// GET /api/settings - Public: get all site settings
settings.get('/', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      'SELECT key, value FROM site_settings'
    ).all()

    const settingsMap: Record<string, string> = {}
    for (const row of results.results as any[]) {
      settingsMap[row.key] = row.value
    }

    return c.json({ settings: settingsMap })
  } catch (error) {
    console.error('Get settings error:', error)
    return c.json({ error: '取得設定失敗' }, 500)
  }
})

// PUT /api/settings - Admin: update site settings
settings.put('/', authMiddleware, adminMiddleware, async (c) => {
  try {
    const body = await c.req.json()
    const now = new Date().toISOString()

    const allowedKeys = ['email', 'phone', 'address', 'tax_id', 'store_name', 'service_hours']

    for (const [key, value] of Object.entries(body)) {
      if (!allowedKeys.includes(key)) continue
      await c.env.DB.prepare(
        'INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)'
      ).bind(key, value as string, now).run()
    }

    // Return updated settings
    const results = await c.env.DB.prepare(
      'SELECT key, value FROM site_settings'
    ).all()

    const settingsMap: Record<string, string> = {}
    for (const row of results.results as any[]) {
      settingsMap[row.key] = row.value
    }

    return c.json({ settings: settingsMap })
  } catch (error) {
    console.error('Update settings error:', error)
    return c.json({ error: '更新設定失敗' }, 500)
  }
})

export default settings
