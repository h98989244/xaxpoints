import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './components/auth/RequireAuth'
import AdminLayout from './components/layout/AdminLayout'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderComplete from './pages/OrderComplete'
import Login from './pages/Login'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Contact from './pages/Contact'
import Refund from './pages/Refund'
import NotFound from './pages/NotFound'
import Dashboard from './pages/member/Dashboard'
import PurchaseHistory from './pages/member/PurchaseHistory'
import AccountSettings from './pages/member/AccountSettings'
import Security from './pages/member/Security'
import Inventory from './pages/admin/Inventory'
import Settings from './pages/admin/Settings'

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // 前台頁面
      { path: '/', element: <Home /> },
      { path: '/products', element: <ProductList /> },
      { path: '/products/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-complete/:id', element: <OrderComplete /> },
      { path: '/login', element: <Login /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/terms', element: <Terms /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/refund', element: <Refund /> },

      // 會員頁面
      { path: '/member', element: <RequireAuth><Dashboard /></RequireAuth> },
      { path: '/member/history', element: <RequireAuth><PurchaseHistory /></RequireAuth> },
      { path: '/member/settings', element: <RequireAuth><AccountSettings /></RequireAuth> },
      { path: '/member/security', element: <RequireAuth><Security /></RequireAuth> },

      // 後台頁面
      { path: '/admin', element: <AdminLayout><div /></AdminLayout> },
      { path: '/admin/inventory', element: <AdminLayout><Inventory /></AdminLayout> },
      { path: '/admin/settings', element: <AdminLayout><Settings /></AdminLayout> },

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
