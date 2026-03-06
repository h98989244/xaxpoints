import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

// 認證守衛：需要登入
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}

// 管理員守衛：需要 admin 權限
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children}</>
}
