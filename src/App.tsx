import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Categories from './pages/admin/Categories'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 前台頁面 */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-complete/:id" element={<OrderComplete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund" element={<Refund />} />

        {/* 會員頁面（需登入） */}
        <Route path="/member" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/member/history" element={<RequireAuth><PurchaseHistory /></RequireAuth>} />
        <Route path="/member/settings" element={<RequireAuth><AccountSettings /></RequireAuth>} />
        <Route path="/member/security" element={<RequireAuth><Security /></RequireAuth>} />

        {/* 後台頁面 */}
        <Route path="/admin" element={<AdminLayout><div /></AdminLayout>} />
        <Route path="/admin/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
        <Route path="/admin/categories" element={<AdminLayout><Categories /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
