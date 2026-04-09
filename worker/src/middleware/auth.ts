import { Context, Next } from 'hono'

type Env = {
  DB: D1Database
  JWT_SECRET: string
}

type UserInfo = {
  id: string
  email: string
  role: string
  display_name: string
}

type Variables = {
  user: UserInfo
}

export async function authMiddleware(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: '未提供認證令牌' }, 401)
  }

  const token = authHeader.substring(7)

  try {
    const result = await c.env.DB.prepare(
      `SELECT s.id as session_id, s.expires_at, u.id, u.email, u.role, u.display_name
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ?`
    ).bind(token).first()

    if (!result) {
      return c.json({ error: '無效的認證令牌' }, 401)
    }

    const expiresAt = new Date(result.expires_at as string)
    if (expiresAt < new Date()) {
      await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
      return c.json({ error: '認證令牌已過期' }, 401)
    }

    c.set('user', {
      id: result.id as string,
      email: result.email as string,
      role: result.role as string,
      display_name: result.display_name as string,
    })

    await next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return c.json({ error: '認證失敗' }, 500)
  }
}

export async function optionalAuth(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    await next()
    return
  }

  const token = authHeader.substring(7)

  try {
    const result = await c.env.DB.prepare(
      `SELECT s.id as session_id, s.expires_at, u.id, u.email, u.role, u.display_name
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ?`
    ).bind(token).first()

    if (result) {
      const expiresAt = new Date(result.expires_at as string)
      if (expiresAt >= new Date()) {
        c.set('user', {
          id: result.id as string,
          email: result.email as string,
          role: result.role as string,
          display_name: result.display_name as string,
        })
      }
    }
  } catch (error) {
    console.error('Optional auth error:', error)
  }

  await next()
}

export async function adminMiddleware(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) {
  const user = c.get('user')
  if (!user || user.role !== 'admin') {
    return c.json({ error: '需要管理員權限' }, 403)
  }
  await next()
}
