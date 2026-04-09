import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'

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

const auth = new Hono<{ Bindings: Env; Variables: Variables }>()

// --- Password hashing utilities ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  const hashArray = new Uint8Array(hash)
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${saltHex}:${hashHex}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, storedHashHex] = stored.split(':')
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)))
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex === storedHashHex
}

function generateToken(): string {
  return crypto.randomUUID() + crypto.randomUUID()
}

// --- Routes ---

// POST /api/auth/register
auth.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, display_name } = body

    if (!email || !password || !display_name) {
      return c.json({ error: '請填寫所有必填欄位' }, 400)
    }

    if (password.length < 6) {
      return c.json({ error: '密碼至少需要6個字元' }, 400)
    }

    // Check if email already exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first()

    if (existing) {
      return c.json({ error: '此電子信箱已被註冊' }, 409)
    }

    const id = crypto.randomUUID()
    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()

    await c.env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, display_name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, email, passwordHash, display_name, 'user', now).run()

    // Create session
    const token = generateToken()
    const sessionId = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(sessionId, id, token, expiresAt, now).run()

    return c.json({
      token,
      user: {
        id,
        email,
        display_name,
        phone: null,
        role: 'user',
      },
    }, 201)
  } catch (error) {
    console.error('Register error:', error)
    return c.json({ error: '註冊失敗，請稍後再試' }, 500)
  }
})

// POST /api/auth/login
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body

    if (!email || !password) {
      return c.json({ error: '請輸入電子信箱和密碼' }, 400)
    }

    const user = await c.env.DB.prepare(
      'SELECT id, email, password_hash, display_name, phone, role FROM users WHERE email = ?'
    ).bind(email).first()

    if (!user) {
      return c.json({ error: '電子信箱或密碼錯誤' }, 401)
    }

    const valid = await verifyPassword(password, user.password_hash as string)
    if (!valid) {
      return c.json({ error: '電子信箱或密碼錯誤' }, 401)
    }

    // Create session
    const token = generateToken()
    const sessionId = crypto.randomUUID()
    const now = new Date().toISOString()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(sessionId, user.id as string, token, expiresAt, now).run()

    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: '登入失敗，請稍後再試' }, 500)
  }
})

// POST /api/auth/logout
auth.post('/logout', authMiddleware, async (c) => {
  try {
    const authHeader = c.req.header('Authorization')!
    const token = authHeader.substring(7)

    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()

    return c.json({ message: '已成功登出' })
  } catch (error) {
    console.error('Logout error:', error)
    return c.json({ error: '登出失敗' }, 500)
  }
})

// PUT /api/auth/profile - Update user profile (phone, display_name)
auth.put('/profile', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const { phone, display_name } = body

    const updates: string[] = []
    const values: any[] = []

    if (phone !== undefined) {
      updates.push('phone = ?')
      values.push(phone)
    }
    if (display_name !== undefined) {
      updates.push('display_name = ?')
      values.push(display_name)
    }

    if (updates.length === 0) {
      return c.json({ error: '沒有要更新的欄位' }, 400)
    }

    values.push(user.id)
    await c.env.DB.prepare(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...values).run()

    const updatedUser = await c.env.DB.prepare(
      'SELECT id, email, display_name, phone, role, created_at FROM users WHERE id = ?'
    ).bind(user.id).first()

    return c.json({ user: updatedUser })
  } catch (error) {
    console.error('Update profile error:', error)
    return c.json({ error: '更新個人資料失敗' }, 500)
  }
})

// GET /api/auth/me
auth.get('/me', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const fullUser = await c.env.DB.prepare(
      'SELECT id, email, display_name, phone, role, created_at FROM users WHERE id = ?'
    ).bind(user.id).first()

    if (!fullUser) {
      return c.json({ error: '找不到使用者' }, 404)
    }

    return c.json({ user: fullUser })
  } catch (error) {
    console.error('Get me error:', error)
    return c.json({ error: '取得使用者資料失敗' }, 500)
  }
})

export default auth
